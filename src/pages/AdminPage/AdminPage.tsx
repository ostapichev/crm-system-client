import { FC } from 'react';

import {SearchUsers, StatisticOrders, UsersPanel} from '../../components';

const AdminPage: FC = () => {
    return (
        <div className='bg-light'>
            <StatisticOrders />
            <SearchUsers />
            <UsersPanel />
        </div>
    );
};

export {
    AdminPage
};
