/**
 * Configuration for browserify and its plugins and transforms
 */

let config = require('config'),
    watchify = require('watchify'),
    dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

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
module.exports = config;