import { FC, useCallback } from 'react';

import { Container, Navbar } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IPagination } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { useSearchParams } from 'react-router-dom';
import { IFuncNumber } from '../../types';

const Footer: FC = () => {
    const [, setQuery] = useSearchParams();
    const { page, limit, totalPages, totalOrders } = useAppSelector(state => state.orderReducer);
    const pageChanger = useCallback((value: string): void => {
        setQuery(prev => {
            const newPage: number = value === '&raquo;' || value === ' ...'
                ? totalPages
                : value === '&laquo;' || value === '... '
                    ? 1
                    : value === '&lsaquo;'
                        ? Math.max(+prev.get('page') - 1, 1)
                        : value === '&rsaquo;'
                            ? Math.min((+prev.get('page') || 1) + 1, totalPages)
                            : +value;
            return { ...prev, page: newPage.toString() };
        });
    }, [setQuery, totalPages]);
    const getPage: IFuncNumber = (): number => {
        return Math.ceil(totalOrders / limit);
    };
    const dataPagination: IPagination = {
        totalPages,
        page: page >= totalPages ? getPage() : page,
        siblings: 2,
        limit,
        pageChanger,
    };

    return (
        <Navbar className="bg-dark-subtle" fixed='bottom' sticky='bottom'>
            <Container>
                { totalPages > 1 && <PaginationApp dataPagination={ dataPagination } /> }
            </Container>
        </Navbar>
    );
};

export {
    Footer
};
