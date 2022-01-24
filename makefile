# première cible = cible par défaut : «guide-html.html»
all: docs/guide-html.html docs/guide-php.html

# dépendances supplémentaires (en plus de la cible générique ci-dessous)
docs/guide-html.html: guide-html-*.twig
#docs/guide-php.html:  guide-php-*.twig

# cible générique : xxx.html est fait à partir de xxx.twig
docs/%.html: %.twig
	$(info cible: $@)
	$(info dependances: $+)
	$(info dependances plus recentes que la cible: $?)
	(echo '<?php $$template = <<<EOF'; cat $*.twig; echo; echo 'EOF; $$env=["dep"=>"$+"]; include "page.php";') | php.exe > $@
