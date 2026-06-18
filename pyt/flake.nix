{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      rec {
        packages.python3 = pkgs.python3Full.withPackages (ps: with ps; [
          toolz
          requests
          matplotlib
          flask
          flask-cors
          scipy
          pandas
          
          # --- TERMINAL DEBUGGING TOOLS ---
          ipdb   # Interactive, colorized terminal debugger
          pudb   # Full visual TUI (Text User Interface) debugger
        ]);
        
        packages.gnuplot = pkgs.gnuplot;
        packages.unzip = pkgs.unzip;
        packages.default = packages.python3;

        devShells.default = pkgs.mkShell {
          name = "python-for-SMILE";
          
          packages = [
            packages.python3
            packages.gnuplot
            pkgs.nodejs
          ];
          
          shellHook = ''
            echo "🐍 Python SMILE Environment Loaded!"
            echo "Available debuggers: 'ipdb' (interactive) or 'pudb' (visual TUI)"
          '';
        };
      });
}
