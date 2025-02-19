import { FC, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Alert, Container, Navbar } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IFeedback, IPagination, IPaginationData } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { IFuncValueString } from '../../types';

interface IProps {
    pageName: string;
}

const FooterApp: FC<IProps> = ({ pageName }) => {
    const [ errorMessage, setErrorMessage] = useState<IFeedback>(null);
    const [, setQuery] = useSearchParams();
    const { pageOrders, ordersLimit, totalOrdersPages } = useAppSelector(state => state.orderReducer);
    const { pageUsers, totalUsersPages, usersLimit } = useAppSelector(state => state.adminPanelReducer);
    const getDataPaginate: () => IPaginationData = (): IPaginationData => {
        let data: IPaginationData = {};
        switch (pageName) {
            case ('orders'):
                data.page = pageOrders;
                data.totalPages = totalOrdersPages;
                data.limit = ordersLimit;
                break;
            case ('admin'):
                data.page = pageUsers;
                data.totalPages = totalUsersPages;
                data.limit = usersLimit;
                break;
            default:
                setErrorMessage({ message: 'Unknown page!' });
            }
            return data;
    };
    const { page, totalPages, limit } = getDataPaginate();
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
    const dataPagination: IPagination = {
        totalPages,
        page,
        siblings: 2,
        limit,
        pageChanger,
    };

    return (
        <Navbar className='bg-dark-subtle mt-auto z-1' fixed='bottom'>
            <Container>
                {
                    totalPages > 1 && !errorMessage && <PaginationApp dataPagination={ dataPagination } />
                }
                {
                    errorMessage &&
                    <Alert variant='danger'>{ errorMessage.message }</Alert>
                }
            </Container>
        </Navbar>
    );
};

export {
    FooterApp
};
