var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var concat      = require('gulp-concat');
var livereload  = require('gulp-livereload');
var http        = require('http');
var st          = require('st');
var sass        = require('gulp-ruby-sass');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({transform: 'reactify', debug: true}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    return sass('./src/stylesheets/main.scss')
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['browserify', 'copy', 'sass']);

gulp.task('watch', ['server'], function() {
    livereload.listen({ basePath: 'dist' });
    gulp.watch('src/**/*.*', ['default']);
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    ).listen(9000, done);
});
