'use strict';

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    unit: ['mocha -A -u exports --recursive -t 10000 ./test/unit'],
    integrate:['mocha -A -u exports --recursive -t 10000 ./test/integrate'],
    accept:['mocha -A -u exports --recursive -t 10000 ./test/accept'],
    fhLintTarget: ['lib/**/*.js']
  });

  grunt.loadNpmTasks('grunt-fh-build');

  grunt.registerTask('test', ['eslint','fh:test']);
  grunt.registerTask('unit', ['eslint', 'fh:unit']);
  grunt.registerTask('dist', ['fh:dist']);
  grunt.registerTask('default', ['fh:default']);
};