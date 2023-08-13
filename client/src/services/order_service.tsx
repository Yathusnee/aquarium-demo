import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../config/globals';
import Order from '../models/Order';

export class OrderService {

    static apiEndpoint: string = `${API_BASE}/order`;

    static placeOrder = (): Promise<AxiosResponse<any, any>> => axios.post<any>(`${this.apiEndpoint}/place`, {}, {withCredentials: true});

    static getNewOrders = (): Promise<AxiosResponse<Order[], any>> => axios.get<Order[]>(`${this.apiEndpoint}/newOrders`, {withCredentials: true});
    
    static getAcceptedOrders = (): Promise<AxiosResponse<Order[], any>> => axios.get<Order[]>(`${this.apiEndpoint}/acceptedOrders`, {withCredentials: true});

    static getShippedOrders = (): Promise<AxiosResponse<Order[], any>> => axios.get<Order[]>(`${this.apiEndpoint}/shippedOrders`, {withCredentials: true});

    static acceptOrder = (orderId: string): Promise<AxiosResponse<any, any>> => axios.post(`${this.apiEndpoint}/accept/${orderId}`, {}, {withCredentials: true});

    static rejectOrder = (orderId: string): Promise<AxiosResponse<any, any>> => axios.post(`${this.apiEndpoint}/reject/${orderId}`, {}, {withCredentials: true});

    static shipOrder = (orderId: string): Promise<AxiosResponse<any, any>> => axios.post(`${this.apiEndpoint}/ship/${orderId}`, {}, {withCredentials: true});
}