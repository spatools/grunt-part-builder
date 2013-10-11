module.exports = function (grunt) {
    grunt.initConfig({
        nodeunit: {
            base: [
                "tests/merger.js",
                "tests/loader.js",
                "tests/builder.js"
            ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    grunt.registerTask("test", ["nodeunit:base"]);
};