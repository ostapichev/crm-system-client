import { FC } from 'react';

import { Users, SearchUsers, StatisticOrders } from '../../components';

const AdminPage: FC = () => {
    return (
        <div className='bg-light'>
            <StatisticOrders />
            <SearchUsers />
            <Users />
        </div>
    );
};

export {
    AdminPage
};
