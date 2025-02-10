import { FC } from 'react';

import {FilterBlock, FooterApp, OrderForm, Orders} from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
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
