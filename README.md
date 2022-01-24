# Le beau code web

## Documents et dossiers

Les fichiers destinés à la publication sont dans [`/docs`](docs). Ils sont mis à jour à l’aide de la commance `make` (cf. ci-dessous).

Table des matières : [`index.html`](docs/index.html)

Les principes sont dans [`principes.html`](docs/principes.html).

## Branches

Les éléments actés sont dans la branche `main`. Les propositions à discuter sont à placer dans des branches de développement spécifiques.

## Installation

Ce dépôt utilise les éléments suivants.

- [PHP](https://www.php.net/) pour calculer la version statique des pages. Le plus simple est de disposer d'une installation *AMP.
- Le gestionnaire de paquets [PHP Composer](https://getcomposer.org/), programmé en PHP. Comme le dossier `vendor` est en `.gitignore`, il faut penser à faire un `composer update` à la première fabrication des fichiers HTML et à chaque mise à jour de `composer.json`.
- Le système de modèles [TWIG](https://twig.symfony.com/), programmé en PHP, tenu à jour par Composer.
- La commande _shell_ `make`. Elle est en général disponible par défaut sur Linux et MacOS. Sur Windows, il est possible d’utiliser un [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/fr-fr/windows/wsl/about). Il est également possible de s’appuyer sur un portage de `make` pour MinGW-W64 <https://sourceforge.net/projects/mingw-w64/files/External%20binary%20packages%20%28Win64%20hosted%29/make/>, pour ceux qui utilisent ce système avec Git. Autre possibilité: Cygwin.
