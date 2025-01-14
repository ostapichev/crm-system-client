import { AxiosRequestConfig } from 'axios';

import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IComment, IOrder, IParams } from '../interfaces';
import { IRes, IResQuery } from '../types';

class OrderService {
    public getAll(params: IParams): IResQuery<IOrder[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.ordersAPI.getAllOrders, config);
    };

    public update(id: number, order: IOrder): IRes<IOrder> {
        return axiosService.patch(urls.ordersAPI.byId(id), order);
    };

    public addComment(orderId: number, comment: IComment): IRes<IComment> {
        return axiosService.post(urls.commentsAPI.comments(orderId), comment);
    };
}

export const orderService = new OrderService();
