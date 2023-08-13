import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../config/globals';
import Compatibility from '../models/Compatibility';

export class CompatibilityService {

    static apiEndpoint: string = `${API_BASE}/compatibilities`;

    static getAllCompatibilities = (): Promise<AxiosResponse<Compatibility[], any>> => axios.get<Compatibility[]>(this.apiEndpoint, {withCredentials: true});

}