import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IGroup } from '../interfaces';
import { IRes } from '../types';

class GroupService {
    public getAll(): IRes<IGroup[]> {
        return axiosService.get(urls.groupsAPI.groups);
    };

    public create(group: IGroup): IRes<IGroup> {
        return axiosService.post(urls.groupsAPI.groups, group);
    };
}

export const groupService = new GroupService();
