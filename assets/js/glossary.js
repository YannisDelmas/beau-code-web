/**
 * Module de glossaire.
 * Activation automatique au chargement de la page.
 * Le glossaire s’applique dans tout élément contenant l’attribut personnalisé `data-glossary`.
 * Cet attribut contient l’URL d’un document HTML contenant un glossaire sous la forme d'une balise `dl`.
 * Dans l’attribut `data-glossary`, l’URL peut être suivi d’un espace puis d’un sélecteur CSS désignant le glossaire. Par défaut, ce sélecteur est `dl.glossary`.
 * 
 * @module glossary
 */

document.addEventListener('DOMContentLoaded', function() {

	// Au chargement de la page on parcourt toutes les demandes de glossaire
	document.querySelectorAll('[data-glossary]').forEach(function(scope){

		// Configuration
		if ( ! scope.dataset.glossary ) return;
		let configuration = scope.dataset.glossary.split(' ', 2);
		if ( configuration.lenght < 2 ) { configuration[1] = 'dl.glossary'; }

		// Chargement du glossaire en AJAX
		let xhr = new XMLHttpRequest();
		xhr.open('get', configuration[0], true);
		xhr.responseType = 'document';
		xhr.addEventListener('load', function() {

			// Quand le glossaire est chargé
			if ( ! this.responseXML ) return;
			let glossaryElement = this.responseXML.querySelector(configuration[1]);
			if ( ! glossaryElement ) return;

			// Production du glossaire
			let glossary = {};
			glossaryElement.querySelectorAll('dt + dd').forEach(function(definitionElement){
				// Définition
				let definition = definitionElement.textContent.trim();
				// Recherche des termes définis
				let i = definitionElement;
				while ( (( i = i.previousElementSibling )) && (i.tagName.toLowerCase() == 'dt') ) {
					glossary[ i.textContent.trim() ] = definition;
					// Variantes orthographiques
					if ( i.dataset.glossaryVariants !== undefined ) {
						i.dataset.glossaryVariants.split(/\s/).forEach(function(alias){
							glossary[ alias ] = definition;
						});
					}
				}
			});
			
			// Dans le champ appelant ce glossaire, on parcourt les abréviations cibles
			scope.querySelectorAll('abbr[title=""]').forEach(function(abbr){
				abbr.title = glossary[ abbr.textContent.trim() ];
			});
		});
		xhr.send();
	});
});