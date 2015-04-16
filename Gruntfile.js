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
        'favicon',
        'index.html'
    ];

    //Create Dev Array
    var srcSync = [];

    for (var i = 0; i < syncPaths.length; i++) {
        srcSync.push('jerryorta.com-dev/buildSync/' + syncPaths[i]);
    }

    //Create Production Array
    var cleanSync = [];

    for (var j = 0; j < syncPaths.length; j++) {
        cleanSync.push('jerryorta.com-production/' + syncPaths[j]);
    }

    //Copy buildSync
    var copySync = [];

    for (var k = 0; k < syncPaths.length; k++) {

        if ( syncPaths[k] != 'index.html') {
            copySync.push(syncPaths[k] + '/**/*');
        } else {
            copySync.push(syncPaths[k]);
        }

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
                expand: true,
                cwd: "jerryorta.com-dev/buildSync",
                src: copySync,
                dest: "jerryorta.com-production"
            }
        }
    });

    grunt.registerTask('deploySync', ['clean:buildSync', 'copy:buildSync'])
};