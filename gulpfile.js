(function() {
  'use strict';

  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect = require('gulp-connect');

  gulp.task('bundle', bundle);
  gulp.task('start-webserver', startWebServer);
  gulp.task('watch', watch);
  gulp.task('default', ['bundle', 'start-webserver', 'watch']);

  /////////////////////////

  var jsFiles = [
    'app/**/*.js',
    '!app/bower_components/**/*',
    '!app/content/bundle.js'
  ];

  function bundle() {
    return gulp.src(jsFiles)
      .pipe(plumber())              // restart gulp on error
      .pipe(sourcemaps.init())      // let sourcemap watch this pipeline
      .pipe(babel())                // transpile into ES5
      .pipe(concat('bundle.js'))    // concatenate all JS files
      .pipe(sourcemaps.write('.'))  // emits sourcemap bundle.js.map for debug
      .pipe(gulp.dest('app/content')) // save bundle.js and bundle.js.map
  }

  function startWebServer() {
    connect.server({ root: 'app' });
  }

  function watch() {
    gulp.watch('app/**/*', ['bundle']);
  }

})();
