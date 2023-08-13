import axios, { AxiosResponse } from 'axios';
import User from '../models/User';
import { API_BASE } from '../config/globals';

export class UserService {

    static apiEndpoint: string = `${API_BASE}/users`;

    static getAllUsers = (): Promise<AxiosResponse<User[], any>> => axios.get<User[]>(this.apiEndpoint, {withCredentials: true});

    static getUserAddress = (): Promise<AxiosResponse<any, any>> => axios.get<any>(`${this.apiEndpoint}/address`, {withCredentials: true});

    static getAllEmployees = (): Promise<AxiosResponse<any, any>> => axios.get<any>(`${this.apiEndpoint}/employees`, {withCredentials: true});

    static getUserById = (id: string): Promise<AxiosResponse<any, any>> => axios.get<any>(`${this.apiEndpoint}/employee/${id}`, {withCredentials: true});

    static addUser = (user: User): Promise<AxiosResponse<any, any>> => axios.post<any>(`${this.apiEndpoint}`, user, {withCredentials: true});

    static updateUser = (user: User): Promise<AxiosResponse<any, any>> => axios.put<any>(`${this.apiEndpoint}`, user, {withCredentials: true});

    static deleteUser = (id: string): Promise<AxiosResponse<any, any>> => axios.delete<any>(`${this.apiEndpoint}/${id}`, {withCredentials: true});

    static getUserRoles = (): Promise<AxiosResponse<string[], any>> => axios.get<string[]>(`${this.apiEndpoint}/roles`, {withCredentials: true});
}