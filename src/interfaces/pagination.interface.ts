import { IFuncValueString } from '../types';

export interface IPaginationData {
    page?: number;
    totalPages?: number;
    limit?: number;
}

export interface IPagination  extends IPaginationData {
    siblings?: number;
    isOpenComments?: boolean;
    pageChanger: IFuncValueString;
}
