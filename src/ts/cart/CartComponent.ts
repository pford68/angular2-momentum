/**
 * Controller for the shopping cart view.
 */

'use strict';
import {Component, Input} from "@angular/core";
import { CartService } from './CartService'


@Component({
    moduleId: 'ts/cart/',
    selector: 'shopping-cart',
    templateUrl: 'view.html',
    styleUrls: [ 'view.css' ],
    providers: [ CartService ]
})
export class Cart {
    @Input() items = [];

    constructor(service: CartService){
        this.items = service.getAll();
    }

    remove(index: number){
        console.log('index', index);
        this.items.splice(index, 1);
    }
}
