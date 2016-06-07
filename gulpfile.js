var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('move-fonts', function() {
    return gulp.src('fonts/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('move-font-awesome', function() {
    return gulp.src('font-awesome/**/*').pipe(gulp.dest('dist/font-awesome'));
});

gulp.task('move-img', function() {
    return gulp.src('img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('minify-js', function() {
  return gulp.src(['js/jquery.js', 'js/classie.js', 'js/*.js'])
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function () {
    gulp.src(['css/bootstrap.min.css', 'css/*.css'])
        .pipe(minify({keepBreaks: true}))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['move-font-awesome', 'move-fonts', 'move-img', 'minify-html', 'minify-css', 'minify-js']);
