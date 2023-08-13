import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../config/globals';
import Category from '../models/Category';

export class CategoryService {

    static apiEndpoint: string = `${API_BASE}/categories`;

    static getAllCategories = (): Promise<AxiosResponse<Category[], any>> => axios.get<Category[]>(this.apiEndpoint, {withCredentials: true});
}