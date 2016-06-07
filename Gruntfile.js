module.exports = function(grunt) {
    var mozjpeg = require('imagemin-mozjpeg');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: [
                    "js/jquery.js",
                    "js/bootstrap.min.js",
                    "js/jquery.easing.min.js",
                    "js/classie.js",
                    "js/cbpAnimatedHeader.js",
                    "js/jqBootstrapValidation.js",
                    "js/contact_me.js",
                    "js/agency.js"
                ],
                dest: 'js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/<%= pkg.name %>.css": ["less/<%= pkg.name %>.less", "css/bootstrap.css"]
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    cleancss: true
                },
                files: {
                    "css/<%= pkg.name %>.min.css": ["css/bootstrap.css", "css/aboutus.css"]
                }
            }
        },
        banner: '/*!\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['css/<%= pkg.name %>.css', 'css/<%= pkg.name %>.min.css', 'js/<%= pkg.name %>.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },
        imageEmbed: {
            dist: {
                src: "css/agency.min.css",
                dest: "css/output.css",

                options: {
                    // Specify a max image size. Default is 32768 (32kb is IE8's limit).
                    // maxImageSize: 0,

                    // Base directory if you use absolute paths in your stylesheet
                    // baseDir: "/Users/ehynds/projects/grunt-image-embed/"

                    // Include certain files types based on a regex
                    regexInclude: /\.(jpg|png|gif|jpeg)/gi,

                    // Exclude certain file types based on a regex
                    regexExclude: /\.(eot|woff|ttf|svg)/gi
                }

            }
        },
        imagemin: { // Task
            static: { // Target
                options: { // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    use: [mozjpeg()]
                },
                files: { // Dictionary of files
                    'img/header-bg2.jpg': 'img/header-bg2.jpg', // 'destination': 'source'
                    'img/map-image.jpg': 'img/map-image.jpg',
                }
            },
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'img/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dist/' // Destination path prefix
                }]
            }
        }
    });

    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-image-embed");
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['imagemin']);
    // grunt.registerTask('default', ['uglify', 'less', 'imageEmbed', 'usebanner']);

};
