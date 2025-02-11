import { AxiosRequestConfig } from 'axios';

import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IActivateUser, IFeedback, IParams, IStatisticOrders, IUser } from '../interfaces';
import { IRes, IResQuery } from '../types';

class AdminPanelService {
    public createUser(user: IUser): IRes<IUser> {
        return axiosService.post(urls.adminAPI.create, user);
    };

    public getAllUsers(params: IParams): IResQuery<IUser[]> {
        const config: AxiosRequestConfig = { params };
        return axiosService.get(urls.usersAPI.getUsers, config);
    };

    public getActivateUser(id: number): IRes<IActivateUser> {
        return axiosService.get(urls.adminAPI.getActivateUser(id));
    };

    public banUser(id: number): IRes<IFeedback> {
        return axiosService.patch(urls.adminAPI.banUser(id));
    };

    public unBanUser(id: number): IRes<IFeedback> {
        return axiosService.patch(urls.adminAPI.unBanUser(id));
    };

    public getStatisticOrder(): IRes<IStatisticOrders> {
        return axiosService.get(urls.adminAPI.statisticOrders);
    };
    
    public getStatisticUser(id: number): IRes<IStatisticOrders> {
        return axiosService.get(urls.adminAPI.statisticUser(id));
    };
}

export const adminPanelService = new AdminPanelService();
