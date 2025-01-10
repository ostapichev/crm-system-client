export interface IErrorOrder {
    group?: string[];
    email?: string[];
    name?: string[];
    surname?: string[];
    phone?: string[];
    age?: string[];
    sum?: string[];
    already_paid?: string[];
}

export interface IErrorResponse {
    messages?: string[];
    path?: string;
    statusCode?: number;
}

export interface IErrorComment {
    comment?: string[];
}
