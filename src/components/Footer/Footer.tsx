import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Container, Navbar } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IPagination } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { IFuncNumber } from '../../types';

const Footer: FC = () => {
    const [, setQuery] = useSearchParams();
    const { pageOrders, ordersLimit, totalOrdersPages, totalOrders } = useAppSelector(state => state.orderReducer);
    const pageChanger = useCallback((value: string): void => {
        setQuery(prev => {
            const newPage: number = value === '&raquo;' || value === ' ...'
                ?
                totalOrdersPages
                :
                value === '&laquo;' || value === '... '
                    ?
                    1
                    :
                    value === '&lsaquo;'
                        ?
                        Math.max(+prev.get('page') - 1, 1)
                        :
                        value === '&rsaquo;'
                            ?
                            Math.min((+prev.get('page') || 1) + 1, totalOrdersPages)
                            :
                            +value;
            const query = new URLSearchParams(prev.toString());
            query.set('page', newPage.toString());
            return query;
        });
    }, [setQuery, totalOrdersPages]);
    const getPage: IFuncNumber = (): number => {
        return Math.ceil(totalOrders / ordersLimit);
    };
    const dataPagination: IPagination = {
        totalPages: totalOrdersPages,
        page: pageOrders >= totalOrdersPages ? getPage() : pageOrders,
        siblings: 2,
        limit: ordersLimit,
        pageChanger,
    };

    return (
        <Navbar className='bg-dark-subtle' fixed='bottom' sticky='bottom'>
            <Container>
                {
                    totalOrdersPages > 1 && <PaginationApp dataPagination={ dataPagination } />
                }
            </Container>
        </Navbar>
    );
};

export {
    Footer
};
