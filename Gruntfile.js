module.exports = function(grunt) 
{
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-linter');	
	grunt.loadNpmTasks('grunt-dot-compiler');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-glue-nu');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var projectName = grunt.option("pagename");

	// Project configuration.
	grunt.initConfig(
	{	
		// ------------ watch scss
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: 
		{
		  sass: 
		  {
		  	interrupt: true,
		    files: ['Content/scss/**/*.scss'],
		    tasks: ['sass:dist']
		  }
		},

		// ------------ scss
		// https://github.com/gruntjs/grunt-contrib-sass
		sass: 
		{
			dist: 
			{
				options:
				{
					style: 'expanded',
      				compass: true,
					lineNumbers: true
				},

				files: 
				[{					
					expand : true,
					cwd    : 'Content/scss',
					src    : ['project.scss'],
					dest   : 'Content/css',
					ext    : '.css'
				}]
			}
		},

		// ------------ glue
		// https://npmjs.org/package/grunt-glue-nu
		glue: 
		{
			options: 
			{				
			},	

			files: 
			{		
				options: 
				{			
					css                : 'Content/css/sprites',
					namespace          : '',				
					crop               : false
				}, 

				src  : ['Content/src/images/sprites/'],
				dest : 'Content/images/sprites' 	 // destination folder of processed images				
			}			
		},

		// this moves and renames the sprites.css folder to the sprites.scss 
		// so it can be compiled with the other SCSS
		rename: 
		{
	        renameSpriteToScss: 
	        {
	            src: 'Content/css/sprites/sprites.css',
	            dest: 'Content/scss/sprites/sprites.scss'
	        }
	    },



		// ------------ pngmin aka pngquant
		// https://npmjs.org/package/grunt-pngmin
		pngmin: 
		{
			compile:
			{
				options: 
				{
					type: 256,
					ext: ".png",
					force: true
				},

				files: 
				[
					{		
						expand : true,
						src    : ['**/*.png'],
						cwd    : 'Content/src/images/compression', // source folder to images to process
						dest   : 'Content/images/' 	 // destination folder of processed images
					}
				]
			}			
		},


		// ------------ LINTER
		linter: 
		{
			files: 
			[
				'Content/js/project/**/*.js'			
			],

			exclude:
			[
				'Content/js/project/templates/templates-compiled.js'
			]
		},

		jshint: 
		{
			options: 
			{
				
			}
		},


		// ------------ DOT compiler
		dot: 
		{
			dist: 
			{
				options: 
				{
					variable : 'oTemplates',
					root     : 'Content/src/templates/'
				},
				src  : ['Content/src/templates/**/*.html'],
				dest : 'Content/js/project/templates/templates-compiled.js'
			}
		},

		// ------------ REQUIREJS
		requirejs:
		{
			compile: 
			{
			    options: 
			    {				 
					name           : "config",			 	
					baseUrl        : "Content/js/project/",	
					include        : ['../libs/require-jquery.js'],	

					optimize       : "uglify2",
					mainConfigFile : "Content/js/project/config.js",				
					out            : 'Content/js/release/' + projectName + '.js',

					preserveLicenseComments : false,
					generateSourceMaps      : true
		
			    }
			}
		}

	});


	// ------------ TASKS

	// build JS and compile templates
	grunt.registerTask('build', ['dot', 'linter', 'requirejs']);

	// compile templates
	grunt.registerTask('buildTemplate', ['dot']);

	// compress pngs
	grunt.registerTask('compressImages', ['pngmin']);

	// glue sprites
	grunt.registerTask('glueSprites', ['glue', 'rename']);	

	// compile scss
	grunt.registerTask('compileScss', ['sass']);
	
	// watch scss
	grunt.registerTask('watchScss', ['sass', 'watch']);

};