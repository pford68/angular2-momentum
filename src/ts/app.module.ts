/**
 *
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Cart }  from './components/Cart';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ Cart ],
    bootstrap: [ Cart ]
})
export class AppModule { }
