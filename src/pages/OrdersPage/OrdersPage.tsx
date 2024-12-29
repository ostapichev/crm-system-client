import { FC } from 'react';

import { Footer, OrdersCollapse } from '../../components';

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
