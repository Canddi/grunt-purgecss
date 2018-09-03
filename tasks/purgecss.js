'use strict';
var Purgecss = require('purgecss')

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('purgecss', 'Grunt plugin for purgecss', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});


    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })

      var purgecssSettings = options;

      purgecssSettings.content = options.content;
      purgecssSettings.css = src;

      // purgecss
      var purgecssResult = new Purgecss(purgecssSettings).purge()[0].css

      // Save size of file before purge
      const filesize_before = grunt.file.read(f.dest).length;
      // Write the destination file.
      grunt.file.write(f.dest, purgecssResult);

      // Print a success message.
      grunt.log.writeln('>> '.green + f.dest + ' purged: ' + (Math.round(filesize_before / 1000).toString() + 'kb').green + ' → ' + (Math.round(purgecssResult.length / 1000).toString() + 'kb').green + ' (' + Math.round(100 * (1 - (purgecssResult.length / filesize_before))) + '%).');
    });
  });

};