import CartItem from "./CartItem";

class Cart {
    _id: string | undefined;
    items: CartItem[] | undefined;
    date: Date | undefined;
    active: boolean | undefined;
}

export default Cart;