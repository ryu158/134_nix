{
  description = "Simple nginx hello server for Oracle Linux 9 using Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };

  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
      openPorts = [ 443 80 22000 24001 35909 35908 35910 ]; 
      #sudo firewall-cmd --zone=public --add-port=35909/tcp --permanent
      firstPort = builtins.toString (builtins.elemAt openPorts 0);
      domain = "ryuora134.duckdns.org";
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = [ pkgs.nginx ];
      };

      packages.x86_64-linux.writeNginxConf = pkgs.writeTextFile {
        name = "nginx.conf";
        text = ''
          # Run nginx as 'nginx' user/groups
          user nginx nginx;
          pid /run/nginx/nginx.pid;
          error_log /var/log/nginx/error.log;

          events{}

          http {
            server {
              listen 80;
              listen [::]:80;
	      server_name ryuora134.duckdns.org;
	      return 301 https://''$host''$request_uri;
            }

            server {
              listen 443 ssl;
              listen [::]:443 ssl;
	      server_name ryuora134.duckdns.org;

              ssl_certificate /etc/letsencrypt/live/ryuora134.duckdns.org/fullchain.pem;
              ssl_certificate_key /etc/letsencrypt/live/ryuora134.duckdns.org/privkey.pem;
              
              ssl_protocols TLSv1.2 TLSv1.3;
              ssl_prefer_server_ciphers on;

              # 1. Allow large file uploads (attachments)
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
              
		          # after change the contents in index.html then 
		          # 'sudo systemctl restart nginx.service' for refresing
		          # every parents folders gives at least 711 permission (dwxr--x--x)
		          # check /home/opc permission if 700 -> generate 500 error
              root /home/opc/nix/nginx/prj/35908;
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

        # if [ ! -f /etc/nginx/nginx.conf ]; then
         echo "Installing nginx.conf to /etc/nginx ..."
         sudo cp ${self.packages.x86_64-linux.writeNginxConf} /etc/nginx/nginx.conf
	 sudo chmod 644 /etc/nginx/nginx.conf
        # else 
        #  echo "Skipping nginx.conf — already exists."
        # fi

        openPorts_bash=(${builtins.concatStringsSep " " (map toString openPorts)})
        echo "${"$"}{openPorts_bash[1]}"
        echo "${"$"}{openPorts_bash[@]}"
        echo "${firstPort}"
        echo "${builtins.toString (builtins.elemAt openPorts 1)}"
        echo -e "\033[32m---------------------------------------------\033[0m"

        # sudo firewall-cmd --zone=public --add-port="${builtins.toString (builtins.elemAt openPorts 0)}"/tcp --permanent
        # sudo firewall-cmd --zone=public --add-port=35909/tcp --permanent

        for port in "${"$"}{openPorts_bash[@]}"; do
         sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent
        done

        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports

        echo "Installing systemd service ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxService} /etc/systemd/system/nginx.service


	echo "Reloading systemd ..."
	sudo systemctl stop nginx.service
        
	echo "Reloading systemd ..."
        sudo systemctl daemon-reload

        echo "Enabling and starting nginx ..."
        sudo systemctl enable --now nginx

        echo "Nginx started on port 8080."

      '';

      packages.x86_64-linux.refresh_nginx = pkgs.writeShellScriptBin "refresh nginx" ''
        set -eux

        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports

        echo "Reloading systemd ..."
        sudo systemctl daemon-reload

        echo "Enabling and starting nginx ..."
        sudo systemctl enable --now nginx

	sudo sh -c "ss -tlnp | grep nginx"

      '';

      packages.x86_64-linux.update_nginx_conf = pkgs.writeShellScriptBin "update nginx conf" ''
        set -eux
        echo "updating ngingx.conf ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxConf} /etc/nginx/nginx.conf

        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports

        echo "restart nginx.service ..."
        sudo systemctl restart nginx.service

        echo "Reloading systemd ..."
        sudo systemctl daemon-reload

        echo "Enabling and starting nginx ..."
        sudo systemctl enable --now nginx

	bat /etc/nginx/nginx.conf
	
	sudo journalctl -u nginx -f
      '';


      packages.x86_64-linux.update_nginx_service = pkgs.writeShellScriptBin "update nginx systemd service" ''
        echo "Installing systemd service ..."
        sudo cp ${self.packages.x86_64-linux.writeNginxService} /etc/systemd/system/nginx.service


	echo "Reloading systemd ..."
	sudo systemctl stop nginx.service
        
	echo "Reloading systemd ..."
        sudo systemctl daemon-reload

        echo "Enabling and starting nginx ..."
        sudo systemctl enable --now nginx

        echo "Nginx started on port 8080."

	bat /etc/systemd/system/nginx.service

        sudo sh -c "systemctl status | grep nginx"
	sudo systemctl status nginx

      '';


      packages.x86_64-linux.get_SSL = pkgs.writeShellScriptBin "generate SSL cerificate via certbot" ''
           if [ -z "$1" ]; then
             echo "❌ Error: You must provide at least one domain address."
             echo "Usage: nix run .#getSSL -- domain1.com domain2.com"
             exit 1
           fi

           echo "🛑 Forcefully stopping web services to free port 80..."
           sudo systemctl stop nginx
           sudo systemctl stop nginx.socket
           sudo pkill -9 nginx
           pkill -9 syncthing

           # Loop through each domain and run an independent Certbot instance
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

           echo "🔄 Restarting web and sync services..."
           echo "sudo systemctl start nginx.socket"
           echo "sudo systemctl start nginx"
        
           if [ -f ~/.config/syncthing/config.xml ]; then
             nohup syncthing -no-browser > ~/.config/syncthing/syncthing.log 2>&1 &
           fi

           echo "✅ All isolated SSL certificates have been generated successfully!"

            # 1. Grant the 'nginx' user access to the live and archive directories
            sudo setfacl -R -m u:nginx:rx /etc/letsencrypt/live/
            sudo setfacl -R -m u:nginx:rx /etc/letsencrypt/archive/

	    # 2. Set the default ACL so any future renewed certificates automatically inherit these permissions
            sudo setfacl -R -d -m u:nginx:rx /etc/letsencrypt/live/
            sudo setfacl -R -d -m u:nginx:rx /etc/letsencrypt/archive/

	    # getfacl /etc/letsencrypt/live/ -> user:nginx:r-x
      '';

      packages.x86_64-linux.update_firewall = pkgs.writeShellScriptBin "update firewall list" ''
        openPorts_bash=(${builtins.concatStringsSep " " (map toString openPorts)})
	for port in "${"$"}{openPorts_bash[@]}"; do
	 sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent
        done

        sudo firewall-cmd --reload
        sudo firewall-cmd --list-ports
      '';

    };
}

# nix run .#nginx_Conf_update -> nginxConf update (/etc/nginx/nginx.conf) and apply (refresh)
# nix run .#get_SSL -- ryuora158.duckdns.org ryu ryuora158sb.duckdns.org -> getting SSL certificates
# nix build .#nginxService ->nginx.Service modify

# 1. check firewall: firewall-cmd --list-ports                                          

# 2. after modify index.html -> systemctl restart       

# 2. check port open in oracle cloud server setup (oracle cloud web login) 

# 3. check permission for folder and index files                                        
# nix flake update -> nix build .#install -> ./result@@@
# 4. nix run .#refresh_nginx        

# nginx set up guide
# 1. check nginx.conf (/etc/nginx/nginx.conf)
# 2. port open (sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent, sudo firewall-cmd --list-ports, ss -tlnp | grep {port_num})
# 3. port open in instance level (subnet secure list -> add ingress rule)
# 4. generate all the folder and index.htmml file
# 5. check permission (all parents folders give at least 711)

# nginx setup modify
# 1. after modify nginx.conf -> sudo systemctl daemon-reload -> sudo systemctl enable --now nginx.service
# 2. after modify index.html -> sudo systemctl restart

# nix flake update -> nix build .#install -> ./result/bin/install-hello-nginx
# sudo vim /etc/nginx/nginx.conf
# after modify nginx.conf -> stop nginx.service -> daemon-reload -> enable --now
# after open firewall -> check subnet secure list in instance management -> ingress rule (add port)
# sudo ss -tlnp | grep nginx
# sudo ss -tulpn | grep -E '(80|35908)'

# systemctl status nginx.service
# sudo tail -n 50 /var/log/nginx/error.log
# after change the contents in index.html then 
# 'sudo systemctl restart nginx.service' for refresing
# every parents folders gives at least 711 permission (dwxr--x--x)
# check /home/opc permission if 700 -> generate 500 error

# paths
# nginx.conf = /etc/nginx/nginx.conf
# nginx.service = /etc/systemd/system/nginx.service
# error log = sudo tail -f /var/log/nginx/error.log, sudo journalctl -u nginx -fck /home/opc permission if 700 -> generate 500 error
