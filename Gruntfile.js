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
					meta: function(arg){
						let spawn = require('node:child_process').spawnSync;
						let gitStatus = spawn('git', ['status', '-z', arg], { encoding: 'utf8'});
						let commit, date;
						if ( gitStatus.stdout ) {
							commit = '';
							date = (new Date()).toISOString().split('T')[0];
						} else {
							gitStatus = spawn('git', ['log', '--format=%h:%cs', '-1',arg], { encoding: 'utf8'});
							gitStatus = gitStatus.stdout.trimEnd().split(':');
							commit = gitStatus[0];
							date = gitStatus[1];
						}
						let dataFile = grunt.task.current.data.files[0].data;
						let data = dataFile? (grunt.file.readJSON(dataFile)): [];
						return {
							file: arg,
							home: data.homepage,
							path: (arg.match(/^(.+)-\d/)[1]) + '.html',
							slug: (arg.match(/^.+-\d+-(.*)\.twig$/i))[1],
							commit: commit,
							date: date,
						};
					},
				},
				filters: {
					glob: function(arg) { return grunt.file.expand(arg); },
				},
			},
			main: {
				files: [
					{
						data: 'package.json',
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