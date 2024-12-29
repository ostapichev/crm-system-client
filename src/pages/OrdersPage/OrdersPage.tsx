import { FC } from 'react';

import { Footer, Orders } from '../../components';

const OrdersPage: FC = () => {
    return (
        <div>
            <Orders />
            <Footer />
        </div>
    );
};

export {
    OrdersPage
};
