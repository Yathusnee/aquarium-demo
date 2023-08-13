import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../config/globals';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import CartItemDTO from '../models/CartItemDTO';
import Checkout from '../models/CheckoutModel';

export class CartService {

    static apiEndpoint: string = `${API_BASE}/cart`;

    static addToCart = (product: string, quantity: number): Promise<AxiosResponse<Cart, any>> => axios.post<Cart>(this.apiEndpoint, {product: product, quantity: quantity}, {withCredentials: true});

    static getCartItemCount = (): Promise<AxiosResponse<number, any>> => axios.get<number>(`${this.apiEndpoint}/count`, {withCredentials: true});

    static getCartItems = (): Promise<AxiosResponse<CartItemDTO[], any>> => axios.get<CartItemDTO[]>(`${this.apiEndpoint}`, {withCredentials: true});

    static checkout = (): Promise<AxiosResponse<Checkout, any>> => axios.post<Checkout>(`${this.apiEndpoint}/checkout`, {}, {withCredentials: true});
}