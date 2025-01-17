import { FC } from 'react';

import { FilterBlock, Footer, OrderForm, Orders } from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
            <FilterBlock />
            <Orders />
            <OrderForm />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
