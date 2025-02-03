import { UserRoleEnum } from "../enums";

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
    role: UserRoleEnum;
    last_login?: string;
    created_at: string;
}
