/// <binding ProjectOpened='watch, start-webserver' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');
var server = require('gulp-webserver');
var babel = require('gulp-babel');
var criticalCss = require('gulp-critical-css');
var data = require('gulp-data');
var fs = require('fs');

var settings = {
    watchForSassFiles: "src/**/*.scss",
    mainSrcSassFile: "src/style/style.scss",
    buildCssFile: "dist/style/style.min.css",
    buildCssTargetDirectory: "dist/style",

    watchForJsFiles: "src/**/*.js",
    buildJsTargetFileName: "dist/script/script.js",
    buildJsTargetDirectory: "",
    buildImage: "wwwroot/images/",

    watchForPugFiles: "src/pages/*.pug",
    srcPages: "src/pages",
    buildPages: "dist",

    locals: "src/components/layout/locals.json"
}

gulp.task('default', ['do-sass', 'do-critical', 'do-js', 'do-pug']);

gulp.task('do-sass', function () {
    return gulp.src(settings.mainSrcSassFile)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'nested' }))//.on('error', function (err) { console.log(err); }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(settings.buildCssTargetDirectory))
        .pipe(minify())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write(""))
        //.pipe(criticalCss())
        .pipe(gulp.dest(settings.buildCssTargetDirectory))
});

gulp.task('do-critical', function () {
    return gulp.src(settings.buildCssFile)
        .pipe(criticalCss())
        .pipe(gulp.dest(settings.buildCssTargetDirectory))
});

gulp.task('do-js', function () {
    return gulp.src(settings.watchForJsFiles)
        .pipe(sourcemaps.init())

        .pipe(concat(settings.buildJsTargetFileName))
        .pipe(gulp.dest(settings.buildJsTargetDirectory))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(babel({
            presets: ['babili']
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(settings.buildJsTargetDirectory));
});

gulp.task('do-pug', function buildHTML() {
    return gulp.src(settings.srcPages + '/*.pug')
        .pipe(data(JSON.parse(fs.readFileSync(settings.locals))))
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest(settings.buildPages))
});

gulp.task('start-webserver', function () {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            //path : "/dist/"
        }));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(settings.watchForSassFiles, ['do-sass']);
    gulp.watch(settings.watchForJsFiles, ['do-js']);
    gulp.watch(settings.watchForPugFiles, ['do-pug']);
    gulp.watch(settings.locals, ['do-pug']);
    // reload stuff
    gulp.watch([
        settings.buildCssTargetDirectory + '/*.css',
        settings.buildJsTargetDirectory + settings.buildJsTargetFileName,
        settings.buildPages + "/*.*",
        settings.locals,
    ], function (obj) {
        if (obj.type === 'changed') {
            return gulp.src(obj.path).pipe(livereload());
        }
    });
});
