/**
 *
 */

export class CartService {
    private items = [
        { title: 'Caramalized Sumatra', quantity: 4, price: 9.54 },
        { title: 'Ethiopian', quantity: 2, price: 11.04 },
        { title: 'Columbian', quantity: 5, price: 8.11 }
    ];

    getAll() {
        return this.items;
    }
}
