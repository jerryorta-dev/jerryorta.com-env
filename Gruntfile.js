module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');


    var syncDirectories = [
        'bower_components',
        'css',
        'favicon',
        'js',
        'libs'
    ];

    var syncRootFiles =  [
        'favicon.ico',
        'index.html'
    ];

    //Create Dev Array
    var srcSync = [];

    for (var i = 0; i < syncDirectories.length; i++) {
        srcSync.push('jerryorta.com-dev/buildSync/' + syncDirectories[i]);
    }

    //Create Production Array
    var cleanSync = [];

    for (var j = 0; j < syncDirectories.length; j++) {
        cleanSync.push('jerryorta.com-production/' + syncDirectories[j]);
    }

    //Copy buildSync
    var copySync = [];

    for (var k = 0; k < syncDirectories.length; k++) {
        copySync.push(syncDirectories[k] + '/**/*');
    }

    for (var l = 0; l < syncRootFiles.length; l++) {
        copySync.push(syncRootFiles[l]);
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