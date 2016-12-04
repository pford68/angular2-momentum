/**
 * Tasks related to Browserify.  Adds watchify to watch for
 */

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require("browserify"),
    gulpif = require('gulp-if'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
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
    bundler;

config.tsify = {
    noImplicitAny: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    noEmitHelpers: false            // CartController.ts:7 Uncaught ReferenceError: __decorate is not defined(…)
};

function bundle(){
    let entryPoint = './src/ts/main.ts';
    return bundler.bundle()
        .pipe(source(entryPoint))
        .pipe(gulpif(config.debug === false, streamify(uglify())))
        .pipe(rename("main.js"))
        .pipe(gulp.dest('./build/js'));
}


bundler = watchify(browserify(opts), {poll: true})
    .plugin(tsify, config.tsify)
    .transform('babelify', {
        presets: ['latest', 'angular2'],   // https://github.com/shuhei/babel-angular2-app/issues/28
        extensions: [ '.ts', '.js' ]
    })
    .on('update', bundle)
    .on('error', (err) => {
        gutil.log(`Browserify error: ${err.message}`);
        // end this stream
        this.emit('end');
    });



/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", bundle);