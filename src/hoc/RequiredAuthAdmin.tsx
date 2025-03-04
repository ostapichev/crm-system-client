import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { UserRoleEnum } from '../enums';
import { useAppSelector } from '../hooks';

interface IProps {
    children: ReactElement;
}

const RequiredAuthAdmin: FC<IProps> = ({ children }) => {
    const { me, loading } = useAppSelector(state => state.authReducer);
    if (me?.role === UserRoleEnum.ADMIN || !loading) {
        return children;
    }
    return <Navigate to='/orders' />
};

export {
    RequiredAuthAdmin
};
