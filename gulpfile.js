var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

gulp.task('default', ['html', 'styles', 'minify-js'], function() {
    gulp.watch('./html/**/*.html',['html']);
    gulp.watch('./sass/**/*.scss',['styles']);
    gulp.watch('./javascript/**/*.js',['minify-js']);
});


gulp.task('html', function () {
  gulp.src('./html/**/*.html')
      .pipe(gulp.dest('./build/html/'));
});

gulp.task('styles', function() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify-js', function () {
  gulp.src('./javascript/**/*.js')
      .pipe(minify())
      .pipe(gulp.dest('./build/javascript/'));
});
