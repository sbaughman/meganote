(function() {
  'use strict';

  var gulp = require('gulp');
  var plugins = require('gulp-load-plugins')();

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
      .pipe(plugins.plumber())              // restart gulp on error
      .pipe(plugins.sourcemaps.init())      // let sourcemap watch this pipeline
      .pipe(plugins.babel())                // transpile into ES5
      .pipe(plugins.order([
        'app/app.module.js',
        'app/**/*.module.js',
        'app/**/*.js',
      ], { base: './' }))                   // order the files before concatenation
      .pipe(plugins.print())                // print files to the console
      .pipe(plugins.concat('bundle.js'))    // concatenate all JS files
      .pipe(plugins.sourcemaps.write('.'))  // emits sourcemap bundle.js.map for debug
      .pipe(gulp.dest('app/content'))       // save bundle.js and bundle.js.map
  }

  function startWebServer() {
    plugins.connect.server({
      root: 'app',
      port: 8000
    });
  }

  function watch() {
    gulp.watch('app/**/*', ['bundle']);
  }

})();
