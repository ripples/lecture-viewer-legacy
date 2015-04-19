var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var concat      = require('gulp-concat');
var livereload  = require('gulp-livereload');
var http        = require('http');
var st          = require('st');
var sass        = require('gulp-ruby-sass');

gulp.task('browserify', function() {
    gulp.src('./front_end/src/js/main.js')
        .pipe(browserify({transform: 'reactify', debug: true}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./production/js'))
        .pipe(livereload());
});

gulp.task('copy', function() {
    gulp.src('./front_end/src/index.html')
        .pipe(gulp.dest('./production'));
});

gulp.task('sass', function() {
    return sass('./front_end/src/stylesheets/main.scss')
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(gulp.dest('./production/css'));
});

gulp.task('default', ['browserify', 'copy', 'sass']);

gulp.task('watch', ['server'], function() {
    livereload.listen({ basePath: 'production' });
    gulp.watch('front_end/src/**/*.*', ['default']);
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/production', index: 'index.html', cache: false })
    ).listen(9000, done);
});
