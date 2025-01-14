import { FC } from 'react';

import { Footer, OrderForm, Orders } from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
            <Orders />
            <OrderForm />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
