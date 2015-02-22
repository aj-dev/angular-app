module.exports = function (grunt) {

	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: 8000,
					keepalive: true
				}
			},
			devServer: {
				options: {
					port: 8000,
					keepalive: false
				}
			}
		},
		less: {
		    files: {
		        expand: true,
		        src: ['src/**/*.less'],
		        ext: '.css'
		    }
		},
		watch: {
			options: {
				livereload: true,
				spawn: true
			},
			scripts: {
				files: ['src/**/*.js']
			},
			html: {
			    files: ['src/**/*.html']
			},
			css: {
				files: ['src/**/*.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['connect:devServer', 'less', 'watch']);
	grunt.registerTask('default', ['less', 'connect:server']);
};
