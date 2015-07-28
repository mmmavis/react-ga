var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');

var DEST = 'dist/';


var LINT_DIRS = [
    'src/**/*.js',
    'test/**/*.js'
];

var TEST_TASKS = [
    'jshint'
];

var BUILD_TASKS = [
    'jshint',
    // 'package',
    'webpack'
];

gulp.task('webpack', function() {
  return gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
  return gulp.src(LINT_DIRS)
      .pipe(jshint({ lookup: 'node_modules/mofo-style/linters/.jshintrc' }))
      .pipe(jshint.reporter('default'));
});

// gulp.task('package', function() {
//   return gulp.src('src/index.js')
//     // This will output the non-minified version
//     .pipe(gulp.dest(DEST))
//     // This will minify and rename to foo.min.js
//     .pipe(uglify())
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(gulp.dest(DEST));
// });

gulp.task('test', TEST_TASKS);
gulp.task('build', BUILD_TASKS);
