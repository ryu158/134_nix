{
  description = "Simple nginx hello server for Oracle Linux 9 using Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };

  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
      openPorts = [ 8080 35909 35908 ];
      firstPort = builtins.toString (builtins.elemAt openPorts 0);
    in
    {
      devShell.x86_64-linux = pkgs.mkShell {
        packages = [ pkgs.nginx ];
      };

      packages.x86_64-linux.nginxConf = pkgs.writeTextFile {
        name = "nginx.conf";
        text = ''
          # Run nginx as 'nginx' user/group
          user nginx nginx;
          pid /run/nginx/nginx.pid;
          error_log /var/log/nginx/error.log;

          events {}

          http {
            server {
              listen 8080;

              location / {
                default_type text/plain;
                return 200 "Hello\n";
              }
            }
            server {
              listen 35909;
              server_name localhost;

	            root /etc/nginx/prj/35909;
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

      packages.x86_64-linux.nginxService = pkgs.writeTextFile {
        name = "nginx.service";
        text = ''
          [Unit]
          Description=Nginx Hello Server via Nix
          After=network.target

          [Service]
          Type=simple
          User=nginx
          Group=nginx
          ExecStart=${pkgs.nginx}/bin/nginx -g "daemon off;" -c /etc/nginx/nginx.conf
          Restart=always

          [Install]
          WantedBy=multi-user.target
        '';
      };

      packages.x86_64-linux.install_nginx = pkgs.writeShellScriptBin "install-hello-nginx" ''
        set -eux

        echo "Creating nginx user/group if missing..."
        if ! getent group nginx >/dev/null; then
          sudo groupadd -r nginx
        fi
        if ! id -u nginx >/dev/null 2>&1; then
          sudo useradd -r -g nginx -s /usr/bin/false -d /nonexistent nginx
        fi

        echo "Creating required directories..."
        sudo mkdir -p /var/log/nginx /run/nginx /etc/nginx /etc/nginx/prj /etc/nginx/prj/35909 /etc/nginx/prj/35908
        sudo chown -R nginx:nginx /var/log/nginx /run/nginx
        sudo chmod 755 /var/log/nginx /run/nginx /etc/nginx/prj/35909 /etc/nginx/prj/35908

        # if [ ! -f /etc/nginx/nginx.conf ]; then
         echo "Installing nginx.conf to /etc/nginx ..."
         sudo cp ${self.packages.x86_64-linux.nginxConf} /etc/nginx/nginx.conf
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
        sudo cp ${self.packages.x86_64-linux.nginxService} /etc/systemd/system/nginx.service


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

      '';

    };
}

# nix flake update -> nix build .#install -> ./result/bin/install-hello-nginx
# sudo vim /etc/nginx/nginx.conf
# after modify nginx.conf -> stop nginx.service -> daemon-reload -> enable --now
# after open firewall -> check subnet secure list in instance management -> ingress rule (add port)
# sudo ss -tlnp | grep nginx
# systemctl status nginx.service
# sudo tail -n 50 /var/log/nginx/error.log
# after change the contents in index.html then 
# 'sudo systemctl restart nginx.service' for refresing
# every parents folders gives at least 711 permission (dwxr--x--x)
# check /home/opc permission if 700 -> generate 500 error
