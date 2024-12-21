import { FC } from 'react';

import { Footer, Orders, OrdersCollapse } from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
            <OrdersCollapse />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
