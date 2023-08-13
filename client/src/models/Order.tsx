import Product from "./Product";

class OrderItem {
    _id: string | undefined;
    item: Product | undefined;
    quantity: number | undefined;
}

class Order {
    _id: string | undefined;
    user: string | undefined;
    total: number | undefined;
    status: string | undefined;
    items: OrderItem[] | undefined;
    address: string | undefined;
}

export default Order;