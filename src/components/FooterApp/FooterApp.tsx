import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Container, Navbar } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IPagination } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { IFuncNumber, IFuncValueString } from '../../types';

interface IProps {
    pageName: string;
}

const FooterApp: FC<IProps> = ({ pageName }) => {
    const [, setQuery] = useSearchParams();
    const { pageOrders, ordersLimit, totalOrdersPages, totalOrders } = useAppSelector(state => state.orderReducer);
    const { pageUsers, totalUsersPages, usersLimit, totalUsers } = useAppSelector(state => state.adminPanelReducer);
    const totalPages = pageName === 'orders' ? totalOrdersPages : totalUsersPages;
    const totalItems = pageName === 'orders' ? totalOrders : totalUsers;
    const page = pageName === 'orders' ? pageOrders : pageUsers;
    const limit = pageName === 'orders' ? ordersLimit : usersLimit;
    const pageChanger: IFuncValueString = useCallback((value: string): void => {
        setQuery(prev => {
            const newPage: number = value === '&raquo;' || value === ' ...'
                ?
                totalPages
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
                            Math.min((+prev.get('page') || 1) + 1, totalPages)
                            :
                            +value;
            const query = new URLSearchParams(prev.toString());
            query.set('page', newPage.toString());
            return query;
        });
    }, [setQuery, totalPages]);
    const getPage: IFuncNumber = (): number => {
        return Math.ceil(totalItems / limit);
    };
    const dataPagination: IPagination = {
        totalPages,
        page: page >= totalPages ? getPage() : page,
        siblings: 2,
        limit,
        pageChanger,
    };

    return (
        <Navbar className='bg-dark-subtle z-0' fixed='bottom' sticky='bottom'>
            <Container>
                {
                    totalPages > 1 && <PaginationApp dataPagination={ dataPagination } />
                }
            </Container>
        </Navbar>
    );
};

export {
    FooterApp
};
