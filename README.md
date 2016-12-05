# angular2-momentum
Migrating a small Angular 1 sample to Angular 2.  This project was scaffolded
with [Gulp Scaffold](https://github.com/pford68/gulp-scaffold).

## Technology Stack
* Angular 2
* Gulp
* Browserify, with Watchify
* Typescript, integrated with Browserify through Tsify
* Babelify, for transpiling ES6.
* lite-server


## Building and Running
1. Run `gulp clean build` to do a clean build.
1. Run `npm run dev` to start the server and open the app in Chrome.
   * Configure a different browser in bs-config.json, in the project root.

### Watchify
When `NODE_ENV` is either blank or set to "development," the app will be built and run
in development mode.  That means that Watchify will remain active, watching for .ts or .js
changes, after the Browserify task has run.   Set `NODE_ENV` to something else, to
disable Watchify.

Other tasks like `views` or `sass` have to be run manually (or through `build`) to make
the server and browser reload.

### Build Configuration
* Debug mode is set in the `config` directory.
* Browserify, Tsify, Babelify, and Watchify are all currently configured in `tasks/browserify.js`.

Tsify options, needed for Angular 2 TypeScript and ES6 support:

  ```javascript
  {
    target: 'ES6',                  // Necessary, even though the app builds without it when Watchify is active.
    noImplicitAny: false,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    noEmitHelpers: false     // CartController.ts:7 Uncaught ReferenceError: __decorate is not defined(…)
  }
  ```
