/**
 * Bootstrap file
 */

import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {CartModule} from './cart';

console.log('Hello, from the Shopping Cart!!');

platformBrowserDynamic().bootstrapModule(CartModule);
