export interface IErrorAuth {
    messages?: string[];
}

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

export interface IErrorGroup {
    name?: string[];
}

export interface IErrorComment {
    comment?: string[];
}
