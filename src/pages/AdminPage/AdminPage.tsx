import { FC } from 'react';

import { StatisticOrders, UsersPanel } from '../../components';

const AdminPage: FC = () => {
    return (
        <div className='bg-light'>
            <StatisticOrders />
            <UsersPanel />
        </div>
    );
};

export {
    AdminPage
};
