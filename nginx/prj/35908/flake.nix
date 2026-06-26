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
        packages.nodeJs= pkgs.nodejs;
        defaultPackage = packages.nodejs;

        devShells.default = pkgs.mkShell rec {
          name = "usingNodeJs";
          buildInputs = [
            packages.nodeJs
            ];

        };

      });

}
