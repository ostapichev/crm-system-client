import { IUser } from "./user.interface";

export interface IComment {
    id: number;
    text: string;
    created_at: Date;
    order_id: number;
    manager_id: IUser;
}
