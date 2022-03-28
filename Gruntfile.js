module.exports = function(grunt) {
	const chalk = require('chalk');
	const publicFolder = 'docs';
	const traceFile = function(f) {
		if ( grunt.file.isFile(f) ) {
			console.log(chalk.cyan(f), '→', chalk.cyan(grunt.task.current.data.dest));
		}
		return true;
	}

	grunt.initConfig({
		copy: {
			main: {
				expand: true,
				src: '{assets/**,*.html}',
				dest: publicFolder+'/',
				filter: traceFile,
			},
			JSLibs: {
				expand: true,
				flatten: true,
				src: 'node_modules/leader-line/leader-line.min.js',
				dest: publicFolder+'/assets/js/',
				filter: traceFile,
			},
			licence: {
				src: 'LICENSE',
				dest: publicFolder+'/LICENSE.txt',
				filter: traceFile,
			},
		},
		twigRender: {
			options: {
				functions: {
					asset: function(arg) {
						return grunt.file.expand({cwd: publicFolder}, 'assets/**/'+ arg)[0];
					},
				},
				filters: {
					glob: function(arg) { return grunt.file.expand(arg); },
				},
			},
			main: {
				files: [
					{
						data: {},
						expand: true,
						src: ["*.twig", "!*-+([0-9])?(-*).twig", "!_*.twig"],
							// tous les modèles TWIG, hormis les composants et les partiels
						dest: publicFolder+'/',
						ext: ".html"
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-twig-render');

	grunt.registerTask('default', ['copy', 'twigRender']);
};