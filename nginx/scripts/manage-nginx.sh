#!/usr/bin/env bash
set -euo pipefail

# Ensure a subcommand was passed
if [ $# -lt 1 ]; then
  echo "Usage: $0 {install|refresh|update-conf|update-service|get-ssl|update-firewall} [args]"
  exit 1
fi

COMMAND="$1"
shift 

case "$COMMAND" in
  install)
    echo "🚀 Running Nginx Installation..."
    getent group nginx >/dev/null || sudo groupadd -r nginx
    id -u nginx >/dev/null 2>&1 || sudo useradd -r -g nginx -s /usr/bin/false -d /nonexistent nginx

    sudo mkdir -p /var/log/nginx /var/lib/nginx/client_body /run/nginx /etc/nginx /etc/nginx/prj /etc/nginx/prj/35909 /etc/nginx/prj/35908
    sudo chown -R nginx:nginx /var/log/nginx /run/nginx /var/lib/nginx/client_body
    sudo chmod 755 /var/log/nginx /run/nginx /etc/nginx/prj/35909 /etc/nginx/prj/35908

    sudo cp @nginxConf@ /etc/nginx/nginx.conf
    sudo chmod 644 /etc/nginx/nginx.conf

    # Use the array directly populated by substituteAll
    openPorts_bash=(@openPortsStr@)
    for port in "${openPorts_bash[@]}"; do
      sudo firewall-cmd --zone=public --add-port="$port"/tcp --permanent
    done
    sudo firewall-cmd --reload

    sudo cp @nginxService@ /etc/systemd/system/nginx.service
    sudo systemctl stop nginx.service || true
    sudo systemctl daemon-reload
    sudo systemctl enable --now nginx
    echo "✨ Installation complete."
    ;;

  refresh)
    echo "🔄 Refreshing Nginx state..."
    sudo firewall-cmd --reload
    sudo firewall-cmd --list-ports
    sudo systemctl daemon-reload
    sudo systemctl enable --now nginx
    sudo sh -c "ss -tlnp | grep nginx"
    ;;

  update-conf)
    echo "📝 Updating nginx.conf ..."
    sudo cp @nginxConf@ /etc/nginx/nginx.conf
    sudo firewall-cmd --reload
    sudo systemctl restart nginx.service
    ;;

  update-service)
    echo "⚙️ Updating systemd service ..."
    sudo cp @nginxService@ /etc/systemd/system/nginx.service
    sudo systemctl stop nginx.service || true
    sudo systemctl daemon-reload
    sudo systemctl enable --now nginx
    sudo systemctl status nginx
    ;;

  get-ssl)
    if [ $# -lt 1 ]; then
      echo "❌ Error: You must provide at least one domain address."
      exit 1
    fi
    echo "🛑 Freeing port 80..."
    sudo systemctl stop nginx || true
    sudo pkill -9 nginx || true

    for dom in "$@"; do
      echo "🔒 Generating standalone SSL for: $dom"
      sudo /usr/bin/certbot certonly --standalone --non-interactive --agree-tos --register-unsafely-without-email -d "$dom"
    done

    sudo systemctl start nginx
    [ ! -d /etc/letsencrypt/live/ ] && sudo mkdir -p /etc/letsencrypt/live/
    [ ! -d /etc/letsencrypt/archive/ ] && sudo mkdir -p /etc/letsencrypt/archive/
    sudo setfacl -R -m u:nginx:rx /etc/letsencrypt/live/ /etc/letsencrypt/archive/
    sudo setfacl -R -d -m u:nginx:rx /etc/letsencrypt/live/ /etc/letsencrypt/archive/
    ;;

  update-firewall)
    echo "🔥 Updating firewall rules..."
    openPorts_bash=(@openPortsStr@)
    for port in "${openPorts_bash[@]}"; do
      sudo firewall-cmd --zone=public --add-port="$port"/tcp --permanent
    done
    sudo firewall-cmd --reload
    sudo firewall-cmd --list-ports
    ;;

  *)
    echo "❌ Unknown command: $COMMAND"
    exit 1
    ;;
esac
