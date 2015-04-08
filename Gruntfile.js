module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');


    var buildAsync = [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/angulartics/dist/angulartics.min.js',
        'bower_components/angulartics/dist/angulartics-ga.min.js'

    ];

    var syncPaths = [
        'bower_components',
        'css',
        'js',
        'libs',
        'index.html'
    ];

    var srcSync = [];

    //Create Dev Array
    for (var i = 0; i < syncPaths.length; i++) {
        srcSync.push('jerryorta.com-dev/buildSync/' + syncPaths[i]);
    }

    var cleanSync = [];

    //Create Production Array
    for (var j = 0; j < syncPaths.length; j++) {
        cleanSync.push('jerryorta.com-production/' + syncPaths[j]);
    }




    grunt.initConfig({

        watch: {
            buildSync: {
                files: ['jerryorta.com-dev/buildSync/**/*'],
                tasks: ['clean:buildSync', 'copy:buildSync'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            buildSync: cleanSync,
            buildAsync: [""] //TODO
        },
        copy: {
            buildSync: {
                src: srcSync,
                dest: "jerryorta.com-production"
            }
        }
    });

    grunt.registerTask('deploySync', ['clean:buildSync', 'copy:buildSync'])
};