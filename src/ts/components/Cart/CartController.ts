'use strict';
import {Component} from "@angular/core";
import {module} from "@angular/upgrade/src/angular_js";
import { CartService } from './CartService'

/*

*/
@Component({
    moduleId: module.id
    selector: 'shopping-cart',
    templateUrl: 'view.html',
    styleUrls: [ 'view.css' ],
    providers: [ CartService ]
})

export class Cart {
    items = [];

    constructor(service: CartService){
        this.items = service.getAll();
    }
}
