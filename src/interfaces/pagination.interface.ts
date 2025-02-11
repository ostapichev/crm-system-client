import { IFuncValueString } from "../types";

export interface IPagination {
    page: number;
    totalPages: number;
    limit?: number;
    siblings?: number;
    isOpenComments?: boolean;
    pageChanger: IFuncValueString;
}
