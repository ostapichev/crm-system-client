import { IUser } from './user.interface';

export interface IComment {
    id: number;
    text: string;
    created_at: string;
    order_id: number;
    user: IUser;
}
