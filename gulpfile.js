var gulp = require('gulp');

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