import { FC } from 'react';

import { FooterApp, StatisticOrders, Users } from '../../components';

const AdminPage: FC = () => {
    return (
        <div className='bg-light'>
            <StatisticOrders />
            <Users />
            <FooterApp pageName='admin' />
        </div>
    );
};

export {
    AdminPage
};
