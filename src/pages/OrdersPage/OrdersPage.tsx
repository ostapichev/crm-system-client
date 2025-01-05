import { FC } from 'react';

import { Footer, OrderForm, OrderForm2, Orders } from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
            <Orders />
            <OrderForm2 />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
