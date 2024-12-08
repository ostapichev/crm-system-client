export interface IQuery<T> {
    data?: T;
    limit?: number;
    page?: number;
    total?: number;
}

export interface IQueryUsers<T> extends IQuery<T> {
    search?: string;
}

export interface IQueryOrders<T> extends IQuery<T> {
    sorting_by?: string;
}
