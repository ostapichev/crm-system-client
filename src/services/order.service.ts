import { AxiosRequestConfig } from 'axios';

import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IOrder, IParams } from '../interfaces';
import { IRes, IResQuery } from '../types';

class OrderService {
    public getAll(params: IParams): IResQuery<IOrder[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.ordersAPI.orders, config);
    };
    
    public create(order: IOrder): IRes<IOrder> {
        return axiosService.post(urls.ordersAPI.orders, order);
    };

    public update(id: number, order: IOrder): IRes<IOrder> {
        return axiosService.patch(urls.ordersAPI.getById(id), order);
    };
}

export const orderService = new OrderService();
