# première cible = cible par défaut : «guide-html.html»
all: docs/guide-generalites.html docs/guide-html.html docs/guide-style.html docs/guide-javascript.html docs/guide-php.html

# dépendances supplémentaires (en plus de la cible générique ci-dessous)
docs/guide-generalites.html: guide-generalites-*.twig
docs/guide-html.html: guide-html-*.twig
#docs/guide-style.html: guide-style-*.twig
#docs/guide-javascript.html: guide-javascript-*.twig
#docs/guide-php.html: guide-php-*.twig

# cible générique : xxx.html est fait à partir de xxx.twig
docs/%.html: %.twig
	@echo -e "cible: \033[32m$@\033[0m"
	@echo -e "dependances plus recentes: \033[36m$?\033[0m"
	(echo '<?php $$template = <<<EOF'; cat $*.twig; echo; echo 'EOF; $$env=["dep"=>"$+"]; include "page.php";') | php.exe > $@
