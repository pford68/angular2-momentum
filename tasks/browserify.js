/**
 * Tasks related to Browserify
 */

let gulp = require('gulp'),
    browserify = require("browserify"),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify = require('watchify'),
    config = require("config"),
    bundler;


function bundle(){
    return bundler.bundle()
        .pipe(source('./src/js/main.js'))
        .pipe(gulpif(config.debug === false, streamify(uglify())))
        .pipe(rename("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./build/js'));
}

let opts = {
    entries: './main.js',
    basedir: './src/js',
    debug: config.debug,
    cache: {},
    packageCache: {}
};
bundler = watchify(browserify(opts), {poll: true})
    .transform('babelify', { presets: 'latest'})
    .on('update', bundle);

/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", bundle);
