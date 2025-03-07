import { AxiosResponse } from 'axios';

import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IAuth, IAuthResponse, ITokens, IUser } from '../interfaces';
import { IRes } from '../types';

class AuthService {
    private readonly accessKey = 'accessToken';
    private readonly refreshKey = 'refreshToken';

    public async login(user: IAuth): Promise<IUser> {
        const { data }: AxiosResponse<IAuthResponse> = await axiosService.post(urls.authAPI.signIn, user);
        this.setTokens(data.tokens);
        const { data: me }: AxiosResponse<IUser> = await this.me();
        return me;
    };

    public async logout(): Promise<void> {
        await axiosService.post(urls.authAPI.logout);
        this.clearDataStorage();
    };

    public me(): IRes<IUser>{
        return axiosService.get<IUser>(urls.authAPI.me);
    };

    public async activateRequestUser(formData: FormData, token: string): Promise<void> {
        return await axiosService.post(urls.authAPI.activateUser(token), formData);
    };

    public clearDataStorage(): void {
        localStorage.clear();
    };

    public async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists");
        }
        const { data }: AxiosResponse<ITokens> = await axiosService.post(
            urls.authAPI.refresh, { refresh: refreshToken }
        );
        this.setTokens(data);
    };

    public getAccessToken(): string {
        return localStorage.getItem(this.accessKey);
    };

    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey);
    };

    private setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(this.accessKey, accessToken);
        localStorage.setItem(this.refreshKey, refreshToken);
    };
}

export const authService = new AuthService();
