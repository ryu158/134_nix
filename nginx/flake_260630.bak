{
  description = "Simple nginx hello server for Oracle Linux 9 using Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };

  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
      openPorts = [ 443 80 ]; 
      firstPort = builtins.toString (builtins.elemAt openPorts 0);
      domain = "ryuora134.duckdns.org";
      web_root = "/etc/nginx/prj/35908"; # Changed to absolute path for safety
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = [ pkgs.nginx ];
      };

      packages.x86_64-linux.writeNginxConf = pkgs.writeTextFile {
        name = "nginx.conf";
        text = ''
          pid /run/nginx/nginx.pid;
          error_log /var/log/nginx/error.log;

          events {}

          http {
            # Fixed port: changed from 8080 to 80 to match firewall
            server {
              listen 80;
              listen [::]:80;
              server_name ${domain};
              return 301 https://''$host''$request_uri;
            }

            server {
              listen 443 ssl;
              listen [::]:443 ssl;
              server_name ${domain};

              ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
              ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
              
              ssl_protocols TLSv1.2 TLSv1.3;
              ssl_prefer_server_ciphers on;

              client_max_body_size 2G;
              client_body_buffer_size 128k;

              root /home/opc/nix/nginx/prj/35908;
              index index.html;

              location / {
                try_files $uri $uri/ /index.html;
              }
            }

            server {
              listen 35908;
              server_name localhost;
              
              root ${web_root};
              index index.html;

              location / {
                try_files $uri $uri/ /index.html;
              }
            }
          }
        '';
      };

      packages.x86_64-linux.writeNginxService = pkgs.writeTextFile {
        name = "nginx.service";
        text = ''
          [Unit]
          Description=Nginx Hello Server via Nix
          After=network.target

          [Service]
          Type=simple
          User=nginx
          Group=nginx
          AmbientCapabilities=CAP_NET_BIND_SERVICE
          ExecStart=${pkgs.nginx}/bin/nginx -g "daemon off;" -c /etc/nginx/nginx.conf
          Restart=always

          [Install]
          WantedBy=multi-user.target
        '';
      };

      packages.x86_64-linux.install_nginx = pkgs.writeShellScriptBin "install-nginx" ''
        set -eux

        echo "Creating nginx user/group if missing..."
        if ! getent group nginx >/dev/null; then
          sudo groupadd -r nginx
        fi
        if ! id -u nginx >/dev/null 2>&1; then
          sudo useradd -r -g nginx -s /usr/bin/false -d /nonexistent nginx
        fi

        echo "Creating required directories..."
        sudo mkdir -p /var/log/nginx /var/lib/nginx/client_body /run/nginx /etc/nginx /etc/nginx/prj /etc/nginx/prj/35909 /etc/nginx/prj/35908
        sudo chown -R nginx:nginx /var/log/nginx /run/nginx /var/lib/nginx/client_body
        sudo chmod 755 /var/log/nginx /run/nginx /etc/nginx/prj/35909 /etc/nginx/prj/35908

        echo "Installing nginx.conf to /etc/nginx ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxConf} /etc/nginx/nginx.conf
        sudo chmod 644 /etc/nginx/nginx.conf

        openPorts_bash=(${builtins.concatStringsSep " " (map toString openPorts)})
        
        for port in "''${openPorts_bash[@]}"; do
          sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent
        done

        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports

        echo "Installing systemd service ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxService} /etc/systemd/system/nginx.service

        echo "Reloading systemd ..."
        sudo systemctl stop nginx.service || true
        sudo systemctl daemon-reload

        echo "Enabling and starting nginx ..."
        sudo systemctl enable --now nginx
        echo "Nginx setup complete."
      '';

      # FIXED: Binary names changed from spaces to hyphens
      packages.x86_64-linux.refresh_nginx = pkgs.writeShellScriptBin "refresh-nginx" ''
        set -eux
        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports
        sudo systemctl daemon-reload
        sudo systemctl enable --now nginx
        sudo sh -c "ss -tlnp | grep nginx"
      '';

      packages.x86_64-linux.update_nginx_conf = pkgs.writeShellScriptBin "update-nginx-conf" ''
        set -eux
        echo "updating nginx.conf ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxConf} /etc/nginx/nginx.conf
        sudo firewall-cmd --reload
        sudo systemctl restart nginx.service
        sudo systemctl daemon-reload
        sudo systemctl enable --now nginx
      '';

      packages.x86_64-linux.update_nginx_service = pkgs.writeShellScriptBin "update-nginx-service" ''
        set -eux
        echo "Installing systemd service ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxService} /etc/systemd/system/nginx.service
        sudo systemctl stop nginx.service || true
        sudo systemctl daemon-reload
        sudo systemctl enable --now nginx
        sudo systemctl status nginx
      '';

      packages.x86_64-linux.get_SSL = pkgs.writeShellScriptBin "get-ssl" ''
        if [ -z "$1" ]; then
          echo "❌ Error: You must provide at least one domain address."
          echo "Usage: nix run .#get-ssl -- domain1.com domain2.com"
          exit 1
        fi

        echo "🛑 Forcefully stopping web services to free port 80..."
        sudo systemctl stop nginx || true
        sudo pkill -9 nginx || true

        for dom in "$@"; do
          echo "🔒 Generating standalone SSL certificate for: $dom"
          sudo /usr/bin/certbot certonly \
            --standalone \
            --non-interactive \
            --agree-tos \
            --register-unsafely-without-email \
            -d "$dom"
          echo "✨ Finished certificate for: $dom"
        done

        sudo systemctl start nginx

        [ ! -d /etc/letsencrypt/live/ ] && sudo mkdir -p /etc/letsencrypt/live/
        [ ! -d /etc/letsencrypt/archive/ ] && sudo mkdir -p /etc/letsencrypt/archive/

        sudo setfacl -m u:nginx:x /etc/letsencrypt/

        sudo setfacl -R -m u:nginx:rx /etc/letsencrypt/live/
        sudo setfacl -R -d -m u:nginx:rx /etc/letsencrypt/live/
        sudo setfacl -R -m u:nginx:rx /etc/letsencrypt/archive/
        sudo setfacl -R -d -m u:nginx:rx /etc/letsencrypt/archive/
      '';

      packages.x86_64-linux.update_firewall = pkgs.writeShellScriptBin "update-firewall-list" ''
        openPorts_bash=(${builtins.concatStringsSep " " (map toString openPorts)})
        for port in "''${openPorts_bash[@]}"; do
          sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent
        done
        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports
      '';
    };
}

# sudo journalctl -u nginx.service -n 50 --no-pager
