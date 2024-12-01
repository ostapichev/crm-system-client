import { UserRoleEnum } from "../enums";

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
    last_login?: Date;
    role: UserRoleEnum;
}
