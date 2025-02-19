import { IFuncValueStringString } from '../types';

const dataInsertUtil: IFuncValueStringString = (data: string): string => {
    if (data) return data;
    return 'no data';
};

export {
    dataInsertUtil
};
