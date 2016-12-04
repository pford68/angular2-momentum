/**
 * Tasks related to Browserify.  Adds watchify to watch for
 */

let gulp = require('gulp'),
    browserify = require("browserify"),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    tsify = require('tsify'),
    config = require("config"),
    opts = {
        entries: './main.ts',
        basedir: './src/ts',
        debug: config.debug,
        cache: {},
        packageCache: {}
    },
    b = browserify(opts);

b = watchify(b, {poll: true})
    .plugin(tsify, { noImplicitAny: true });


function bundle(){
    let entryPoint = './src/ts/main.ts';
    return b.bundle()
        .pipe(source(entryPoint))
        .pipe(gulpif(config.debug === false, streamify(uglify())))
        .pipe(rename("main.js"))
        .pipe(buffer())
        .pipe(gulp.dest('./build/js'));
}

/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", bundle);
b.on('update', bundle);