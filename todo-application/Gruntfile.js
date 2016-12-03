/**
 * Created by Lindon on 11/19/2016.
 */
module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        appCss: grunt.file.readJSON("config/src.css.json"),

        tag: {
            banner: '/*!\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright (c) <%= pkg.copyright %>. All rights reserved.\n' +
            ' */\n'
        },

        // jshint task
        jshint: {
            app: ['src/js/app/**/*.js'],
            options: {
                notypeof: true,
                debug: true,
                eqnull: true,
                eqeqeq: false,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // clean task
        clean: {
            all: ['dist/**'],
            templates: ['dist/js/templates.js']
        },

        // copy task
        copy: {
            fonts: {
                files:[
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: ['css/**', 'fonts/**'],
                        dest: 'dist/fonts/font-awesome'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: ['**'],
                        dest: 'dist/fonts'
                    }
                ]
            },

            css: {
                files:[
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: ['bootstrap.css'],
                        dest: 'dist/css'
                    }
                ]
            }
        },

        // wiredep task
        wiredep: {
          dev: {
              src: "index.html"
          }
        },

        // include source task
        includeSource: {
            options: {
                basePath: '',
                typeMappings: {
                    'html': 'html'
                }
            },
            dev: {
                files: {
                    'index.html': 'src/index/index_dev.html'
                }
            }
        },

        // concat task
        concat: {
            angularApp: {
                src: grunt.file.readJSON("config/src.app.json"),
                dist: 'dist/js/app.js'
            }
        },

        // uglify task
        uglify: {
            options: {
                banner: '<%= tag.banner %>',
                beautify : false,
                mangle: false,
                compress: true,
                sourceMap: false
            },

            angularApp:{
                files: {
                    'dist/js/app.js': ['<%= concat.angularApp.dest %>']
                }
            }
        },

        // sass task
        sass: {
            dist: {
                options: {
                    noCache: true,
                    style: 'compressed'
                },
                files: {
                    'dist/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        // ng templates task
        ngtemplates: {
            app:{
                cwd: "src/js/app/",
                src: "**/*.html",
                dest: "dist/js/templates.js",
                options:{
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true, removeComments: true }
                }
            }
        },

        // watch task
        watch: {
            css: {
                files: ["src/sass/**/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                }
            },

            appTemplates: {
                files: ['src/js/app/**/*.html'],
                tasks: ['ngtemplates:app', 'includeSource:dev', 'wiredep:dev']
            },

            srcApp:{
                files: ['src/js/app/**/*.js'],
                tasks: ['includeSource:dev', 'wiredep:dev']
            }
        },

        // browserSync task
        browserSync: {
            dev:{
                options: {
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }

    });

    // task loader
    require('jit-grunt')(grunt, {
        ngtemplates: 'grunt-angular-templates'
    });

    grunt.registerTask("dev", ["clean:all","copy", "sass:dist", "ngtemplates:app", "includeSource:dev", "wiredep:dev"]);

    grunt.registerTask("start", ["dev","browserSync"]);
};