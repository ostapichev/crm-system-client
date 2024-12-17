import { AxiosRequestConfig } from 'axios';

import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IOrder, IParams } from '../interfaces';
import { IResQuery } from '../types';

class OrderService {
    public getAll(params: IParams): IResQuery<IOrder[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.ordersAPI.getAllOrders, config);
    };
};

export const orderService = new OrderService();
