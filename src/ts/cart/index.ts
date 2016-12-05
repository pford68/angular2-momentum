/**
 * Cart Module:  main application module.
 */

'use strict';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Cart}  from './CartComponent';
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Cart],
    bootstrap: [Cart]         // Bootstrap takes a Component, not a module
})
export class CartModule {
}
