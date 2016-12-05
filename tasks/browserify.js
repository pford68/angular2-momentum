/**
 * Tasks related to Browserify.  Adds watchify to watch for changes
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
    dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    bundler;


//========================================================= Configuration
Object.assign(config, {
    browserify: {
        entries: './main.ts',
        basedir: './src/ts',
        debug: config.debug,
        cache: {},
        packageCache: {},
        plugin: [
            [watchify, {poll:true}]   // poll = true has been necessary on my work laptop.
        ]
    },
    tsify: {
        target: 'ES6',                  // Necessary, even though the app builds without it when Watchify is active.
        noImplicitAny: false,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        noEmitHelpers: false            // CartController.ts:7 Uncaught ReferenceError: __decorate is not defined(…)
    },
    babelify: {
        presets: ['latest', 'angular2'],   // https://github.com/shuhei/babel-angular2-app/issues/28
        extensions: ['.ts', '.js']
    }
});
if (!dev){
    delete config.browserify.plugin;
}
console.log('Build configuration: ', config);



//========================================================== Initialization
function bundle() {
    let entryPoint = './src/ts/main.ts';
    return bundler.bundle()
        .pipe(source(entryPoint))
        .pipe(gulpif(config.debug === false, streamify(uglify())))
        .pipe(rename("main.js"))
        .pipe(gulp.dest('./build/js'));
}

bundler = browserify(config.browserify)
    .plugin(tsify, config.tsify)
    .transform('babelify', config.babelify)
    .on('update', bundle)          // Absolutely necessary for the server to reload, and probably to re-bundle
    .on('error', (err) => {
        gutil.log(`Browserify error: ${err.message}`);
        // end this stream
        this.emit('end');
    });




//========================================================= Tasks
/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", bundle);