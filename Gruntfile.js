module.exports = function(grunt){
    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'app/bower_components/jquery/dist/jquery.min.js',
                    'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'app/js/**/*.js'
                ],
                dest: 'app/dist/scripts.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'app/dist/scripts.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/js/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        compass: {
            compassCompile: {
                options: {
                    sassDir: 'app/sass',
                    cssDir: 'app/css',
                    cacheDir: 'app/.sass-cache',
                    force: true
                }
            },
            server: {
                options: {
                    sassDir: 'app/sass',
                    cssDir: 'app/css',
                    cacheDir: 'app/.sass-cache',
                    force: true,
                    watch: true
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'app/dist/styles.min.css' : ['app/css/**/*.css']
                }
            }
        },
        clean: {
            dist: {
                src: ['app/dist/*']
            }
        },
        watch: {
            css: {
                files: 'app/sass/**/*.scss',
                tasks: ['compassCompile']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['app/css/**/*.css', 'app/*.html', 'app/**/*.js']
            }
        },
        connect: {
            serverLive: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: 35729,
                    base: {
                        path: 'app/',
                        index: 'index.html'
                    },
                    open: true
                }
            },
            serverStatic: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: false,
                    base: {
                        path: 'app/',
                        index: 'index.html'
                    },
                    open: true
                }
            }
        }
    });

    grunt.registerTask('dist', [
        'clean',
        'compass:compassCompile',
        'cssmin',
        //'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('compassCompile', [
        'compass:compassCompile'
    ]);

    grunt.registerTask('server', [
        'compass:compassCompile',
        'connect:serverStatic',
        'compass:server'
    ]);

    grunt.registerTask('serverLive', [
        'compass:compassCompile',
        'connect:serverLive',
        'watch'
    ]);
};
