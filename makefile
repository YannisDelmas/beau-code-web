# première cible = cible par défaut : «guide-html.html»
all: doc/guide-html.html

# dépendances supplémentaires (en plus de la cible générique ci-dessous)
doc/guide-html.html: guide-html-*.twig

# cible générique : xxx.html est fait à partir de xxx.twig
doc/%.html: %.twig
	$(info cible: $@)
	$(info dependances: $+)
	$(info dependances plus recentes que la cible: $?)
	(echo '<?php $$template = <<<EOF'; cat $*.twig; echo; echo 'EOF; $$env=["dep"=>"$+"]; include "page.php";') | php.exe > $@
