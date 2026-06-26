{

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils/main";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
        };

      in rec {
        packages.python3_9 = pkgs.python3Full.withPackages(ps: with ps; [
          toolz requests matplotlib flask flask-cors scipy pandas
        ]);
        packages.gnuplot = pkgs.gnuplot;
        packages.unzip = pkgs.unzip;
        #defaultPackage = packages.s4;

        defaultPackage = packages.python3_9;

        devShells.default = pkgs.mkShell rec {
          name = "python-for-SMILE";
          buildInputs = [
            packages.python3_9
            packages.gnuplot
            pkgs.nodejs
            ];

        };

      });

}
