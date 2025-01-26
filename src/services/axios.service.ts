import axios, { AxiosError } from 'axios';

import { authService } from './auth.service';
import { baseURL, urls } from '../constants';
import { IFuncVoid } from '../types';

const axiosService = axios.create({ baseURL });
const waitList: IFuncVoid[] = [];
let isRefreshing = false;

axiosService.interceptors.request.use(res => {
    const access = authService.getAccessToken();
    if (access) {
        res.headers.Authorization = `Bearer ${access}`;
    }
    return res;
});
axiosService.interceptors.response.use(res => {
        return res;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await authService.refresh();
                    isRefreshing = false;
                    afterRefresh();
                    return axiosService(originalRequest);
                } catch (e) {
                    authService.clearDataStorage();
                    isRefreshing = false;
                    return Promise.reject(error);
                }
            }
            if (originalRequest.url === urls.authAPI.refresh) {
                return Promise.reject(error);
            }
            return new Promise(resolve => {
                const myFunc: IFuncVoid = () => {
                    resolve(axiosService(originalRequest));
                };
                subscribeToWaitList(myFunc);
            });
        }
        return Promise.reject(error);
    });

const subscribeToWaitList: (cb: IFuncVoid) => void = (cb: IFuncVoid): void => {
    waitList.push(cb);
};
const afterRefresh: IFuncVoid = (): void => {
    while (waitList.length) {
        const cb: IFuncVoid = waitList.pop();
        cb();
    }
};

export {
    axiosService
};
