import { ITokens } from './token.interface';
import { IUser } from './user.interface';

export interface IAuth {
    email?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
}

export interface IAuthResponse {
    tokens: ITokens;
    user: IUser;
}
