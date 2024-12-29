import { FC, ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { Table } from 'react-bootstrap';

import { xsValues } from '../../constants';
import { IParams } from '../../interfaces';
import { IFuncVoid, ISortingReverse } from '../../types';
import { groupActions, orderActions } from '../../redux';
import { OrderCollapse } from '../OrderCollapse/OrderCollapse';
import { OrderPlaceholder } from '../OrderPlaceholder/OrderPlaceholder';
import { useAppDispatch, useAppSelector } from '../../hooks';

import css from '../../components/Orders/Orders.module.css';

const OrdersCollapse: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, sorted, loading, limit } = useAppSelector(state => state.orderReducer);
    const [orderId, setOrderId] = useState<number>(null);
    const [query, setQuery] = useSearchParams();
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page'),
            sorting_by: query.get('order_by'),
        }, 500);
    const debouncedParamsString = JSON.stringify(debouncedParams);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        query.set('page', '1');
        query.set('order_by', sorted ? order_by : `-${order_by}`);
        setQuery(query);
        dispatch(orderActions.setOrderByParams());
    };
    const orderById: IFuncVoid = () => sortingOrderBy('id');
    const orderByName: IFuncVoid = () => sortingOrderBy('name');
    const orderBySurname: IFuncVoid = () => sortingOrderBy('surname');
    const orderByEmail: IFuncVoid = () => sortingOrderBy('email');
    const orderByPhone: IFuncVoid = () => sortingOrderBy('phone');
    const orderByAge: IFuncVoid = () => sortingOrderBy('age');
    const orderByCourse: IFuncVoid = () => sortingOrderBy('course');
    const orderByCourseFormat: IFuncVoid = () => sortingOrderBy('course_format');
    const orderByCourseType: IFuncVoid = () => sortingOrderBy('course_type');
    const orderByStatus: IFuncVoid = () => sortingOrderBy('status');
    const orderBySum: IFuncVoid = () => sortingOrderBy('sum');
    const orderByAlreadyPaid: IFuncVoid = () => sortingOrderBy('alreadyPaid');
    const orderByCreatedAt: IFuncVoid = () => sortingOrderBy('created_at');
    const orderByGroup: IFuncVoid = () => sortingOrderBy('group');
    const orderByManager: IFuncVoid = () => sortingOrderBy('manager');
    const places: ReactElement[] = Array.from({ length: limit }, (_: ReactElement, index) => (
        <OrderPlaceholder key={ index } xss={ xsValues } />
    ));
    useEffect(() => {
        dispatch(orderActions.setPage(+query.get('page')));
        dispatch(orderActions.setSorting(query.get('sorting')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(orderActions.setOrdersDefault());
        dispatch(orderActions.getAll({ params }));
        dispatch(groupActions.getAll());
        setOrderId(null);
    }, [dispatch, debouncedParamsString]);

    return (
        <Table className='text-center' size='sm' borderless striped hover>
            <thead>
            <tr>
                <th onClick={ orderById } className={ css.Column }>id</th>
                <th onClick={ orderByName } className={ css.Column }>name</th>
                <th onClick={ orderBySurname } className={ css.Column }>surname</th>
                <th onClick={ orderByEmail } className={ css.Column }>email</th>
                <th onClick={ orderByPhone } className={ css.Column }>phone</th>
                <th onClick={ orderByAge } className={ css.Column }>age</th>
                <th onClick={ orderByCourse } className={ css.Column }>course</th>
                <th onClick={ orderByCourseFormat } className={ css.Column }>course_format</th>
                <th onClick={ orderByCourseType } className={ css.Column }>course_type</th>
                <th onClick={ orderByStatus } className={ css.Column }>status</th>
                <th onClick={ orderBySum } className={ css.Column }>sum</th>
                <th onClick={ orderByAlreadyPaid } className={ css.Column }>alreadyPaid</th>
                <th onClick={ orderByCreatedAt } className={ css.Column }>created_at</th>
                <th onClick={ orderByGroup } className={ css.Column }>group</th>
                <th onClick={ orderByManager } className={ css.Column }>manager</th>
            </tr>
            </thead>
            <tbody>
            { 
                loading || !orders.length 
                    ?
                    places.map((place: ReactElement) => place) 
                    :
                    orders.map(order =>
                        <OrderCollapse key={ order.id }
                           order={ order }
                           isOpen={ order.id === orderId }
                           onClick={ () => (order.id === orderId ? setOrderId(null) : setOrderId(order.id)) }
                        /> )
            }
            </tbody>
        </Table>
    );
};

export {
    OrdersCollapse
};
    