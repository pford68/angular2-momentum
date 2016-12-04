/**
 *
 */
'use strict';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Cart }  from './CartController';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ Cart ],
    bootstrap: [ Cart ]
})

export class CartModule { }
