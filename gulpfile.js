var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var rm = require('gulp-rm');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib'
    };
    return gulp.src('./public/index.html')
        .pipe(wiredep(options))
        .pipe(gulp.dest('./public'));
});

gulp.task('clean:dist', function() {
    return gulp.src('./public/dist/**/*', {
            read: false
        })
        .pipe(rm());
});

gulp.task('build:bundle', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("./public/dist"));
});
