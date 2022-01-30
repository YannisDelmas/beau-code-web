# Le beau code web

## Documents et dossiers

Les fichiers destinés à la publication sont dans [`/docs`](docs). Ils sont mis à jour à l’aide de la commance `make` (cf. ci-dessous).

Table des matières : [`index.html`](docs/index.html)

Les principes sont dans [`principes.html`](docs/principes.html).

## Branches

Les éléments actés sont dans la branche `main`. Les propositions à discuter sont à placer dans des branches de développement spécifiques.

## Installation et mise en œuvre

Ce dépôt utilise [NPM](https://www.npmjs.org/), le gestionnaire de paquets de [Node.js](https://nodejs.org/). Ces deux logiciels doivent être préalablement installés pour pouvoir mettre à jour les fichiers HTML publiés.

La commande `npm install` permet d’installer et mettre à jour les éléments suivants:

- [Grunt](https://gruntjs.com/) pour la gestion et la mise en œuvre des mises à jour.
- Plugin [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy) de Grunt pour la copie en l’état de fichiers.
- Plugin [grunt-twig-render](https://www.npmjs.com/package/grunt-twig-render) de Grunt, utilisant la bibliothèque [Twig.js](https://github.com/twigjs/twig.js), pour le rendu des modèles TWIG ([Wiki](https://github.com/twigjs/twig.js/wiki)).

Pour fabriquer les fichiers publiables, entrer la commande `grunt`.
