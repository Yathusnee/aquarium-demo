import Product from "./Product";

class CartItemDTO {
    item: Product | undefined;
    quantity: number | undefined;
   
    constructor(item: Product, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}

export default CartItemDTO;