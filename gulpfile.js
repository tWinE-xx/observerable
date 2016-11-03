var gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat');

var PATHS = {
    sources: ['src/**/*.js'],
    dist: 'lib'
}

//gulp.task('build', function() {
//  return gulp.src('src/**/*.js')                           
//    .pipe(babel({ presets: ['es2015'] }))   
//    .pipe(gulp.dest(PATHS.dist));
//});

gulp.task('build', function() {
    return gulp.src(PATHS.sources)
        .pipe(gulp.dest(PATHS.dist));
});

gulp.task('watch', function() {
    gulp.watch(PATHS.sources, ['build']);
});

gulp.task('default', ['watch', 'build']);