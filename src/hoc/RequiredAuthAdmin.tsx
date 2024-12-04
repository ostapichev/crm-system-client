import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';
import { UserRoleEnum } from '../enums';

interface IProps {
    children: ReactElement;
}

const RequiredAuthAdmin: FC<IProps> = ({ children }) => {
    const { me } = useAppSelector(state => state.authReducer);
    console.log(me);
    if (!(me?.role === UserRoleEnum.ADMIN)) {
        return <Navigate to='/orders' />
    }
    return children;
};

export {
    RequiredAuthAdmin
};
