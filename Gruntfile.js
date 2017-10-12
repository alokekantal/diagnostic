module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		jshint: {
			files: ['Gruntfile.js', 'server.js'],
			options: {
				eqeqeq: true,
				unused: true
			}
	    },
		watch: {
			files: {
				files: ['<%= jshint.files %>'],
				tasks: ['shell:killnode', 'concurrent']
			}
		},
		shell: {
			options: {
			    stderr: true
			},
			startServer: {				
				command: 'node server.js'	
			},
			killnode: {
				command: "FOR /F \"tokens=5 delims= \" %P IN ('netstat -a -n -o ^| findstr 0.0.0.0:3000') DO TaskKill.exe /PID %P"
			}
		},
		concurrent: {
			target: ['watch', 'shell:startServer'],
			options: {
				logConcurrentOutput: true
			} 
		}		
	}); 

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concurrent']);
};
