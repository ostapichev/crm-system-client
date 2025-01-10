import { FC } from 'react';

import { Footer, OrderForm3, OrderForm2, Orders } from '../../components';
import { OrderForm } from '../../components/OrderForm/OrderForm';

const OrdersPage: FC = () => {
    return (
        <div>
            <Orders />
            <OrderForm3 />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
