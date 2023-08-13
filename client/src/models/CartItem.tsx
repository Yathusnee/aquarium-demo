class CartItem {
    _id: string | undefined;
    item: string | undefined;
    quantity: number | undefined;
   
    constructor(item: string, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}

export default CartItem;