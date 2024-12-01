import { OrderByEnum } from "../enums";

export interface IQuery<T> {
    data?: T;
    limit?: number;
    page?: number;
}

export interface IQueryUsers<T> extends IQuery<T> {
    search?: string;
}

export interface IQueryOrders<T> extends IQuery<T> {
    order_by?: string;
    sorting_by?: OrderByEnum;
}
