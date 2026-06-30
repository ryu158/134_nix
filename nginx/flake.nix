{
  description = "Simple nginx hello server for Oracle Linux 9 using Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };

      # --- Load Private Config from outside the Git repo ---
      # This pulls the data directly from your home folder, safely bypassing Git.
      config = import ./nginx-secrets.nix // {
        nginxPkg = "${pkgs.nginx}"; # Keeps the package derivation tied to nixpkgs
      };

      # 1. Template out configurations using substituteAll
      nginxConfDrv = pkgs.substituteAll {
        src = ./configs/nginx.conf;
        inherit (config) domain web_root;
      };

      nginxServiceDrv = pkgs.substituteAll {
        src = ./configs/nginx.service;
        inherit (config) nginxPkg;
      };

      # 2. Package the master script
      masterScript = pkgs.substituteAll {
        src = ./scripts/manage-nginx.sh;
        isExecutable = true;
        nginxConf = "${nginxConfDrv}";
        nginxService = "${nginxServiceDrv}";
        inherit (config) openPortsStr;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [ pkgs.nginx ];
      };

      packages.${system} = {
        writeNginxConf = nginxConfDrv;
        writeNginxService = nginxServiceDrv;

        install_nginx        = pkgs.writeShellScriptBin "install-nginx"        "${masterScript} install";
        refresh_nginx        = pkgs.writeShellScriptBin "refresh-nginx"        "${masterScript} refresh";
        update_nginx_conf    = pkgs.writeShellScriptBin "update-nginx-conf"    "${masterScript} update-conf";
        update_nginx_service = pkgs.writeShellScriptBin "update-nginx-service" "${masterScript} update-service";
        update_firewall      = pkgs.writeShellScriptBin "update-firewall-list" "${masterScript} update-firewall";
        get_SSL              = pkgs.writeShellScriptBin "get-ssl"              "${masterScript} get-ssl \"$@\"";
      };
    };
}

# nix run --impure .#command
