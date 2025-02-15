import { FC } from 'react';

import {FilterBlock, FooterApp, OrderForm, Orders} from '../../components';

const OrdersPage: FC = () => {
    return (
        <div className='flex-fill bg-light-subtle'>
            <FilterBlock />
            <Orders />
            <OrderForm />
            <FooterApp pageName='orders' />
        </div>
    );
};

export {
    OrdersPage
};
