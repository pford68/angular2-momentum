/**
 *
 */
'use strict';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Cart}  from './CartController';
import {FormsModule} from "@angular/forms";
import {CartService} from "./CartService";


console.log('Cart....', Cart);

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Cart],
    bootstrap: [Cart]         // Bootstrap takes a Component, not a module
})
export class CartModule {
}
