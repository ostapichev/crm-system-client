import { IFuncValueStringString } from '../types';

const dataInsert: IFuncValueStringString = (data: string): string => {
    if (data) return data;
    return 'no data';
};

export {
    dataInsert
};
