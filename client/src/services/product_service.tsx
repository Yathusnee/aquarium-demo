import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../config/globals';
import Product from '../models/Product';

export class ProductService {

    static apiEndpoint: string = `${API_BASE}/products`;

    static getProductsBySubCategory = (subcategory: string): Promise<AxiosResponse<Product[], any>> => axios.get<Product[]>(`${this.apiEndpoint}/bysubcat/${subcategory}`, {withCredentials: true});

    static getProduct = (id: string): Promise<AxiosResponse<Product, any>> => axios.get<Product>(`${this.apiEndpoint}/byid/${id}`, {withCredentials: true});

    static getAllProducts = (): Promise<AxiosResponse<Product[], any>> => axios.get<Product[]>(this.apiEndpoint, {withCredentials: true});
    
    static getProductsForCompatibility = (): Promise<AxiosResponse<Product[], any>> => axios.get<Product[]>(`${this.apiEndpoint}/compatibility`, {withCredentials: true});

    static addProduct = (product: Product): Promise<AxiosResponse<Product, any>> => axios.post<Product>(this.apiEndpoint, product, {withCredentials: true});

}