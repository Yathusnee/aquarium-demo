import axios, { AxiosResponse } from 'axios';
import User from '../models/User';
import { API_BASE } from '../config/globals';
import { clearCookie } from '../utils/cookies';

export class AuthService {

    static apiEndpoint: string = `${API_BASE}/auth`;

    static login = (username: string, password: string): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/login`, {'username': username, 'password': password}, {withCredentials: true});
    
    static register = (user: User): Promise<AxiosResponse<User, any>> => axios.post<User>(`${this.apiEndpoint}/register`, user);

    static logout = () => clearCookie('token');

    static authenticate = (): Promise<AxiosResponse<any, any>> => axios.post<any>(`${this.apiEndpoint}/authenticate`, {}, {withCredentials: true});
}