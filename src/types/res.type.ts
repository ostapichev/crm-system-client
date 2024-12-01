import { AxiosResponse } from 'axios';

import { IQuery } from '../interfaces';

export type IRes<T> = Promise<AxiosResponse<T>>;
export type IResQuery<T> = IRes<IQuery<T>>;
