/**
 *
 */
import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app';
import {CartModule} from './cart';

console.log('OK!!!');

platformBrowserDynamic().bootstrapModule(CartModule);
