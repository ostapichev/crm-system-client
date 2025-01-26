import { FC, ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { Table } from 'react-bootstrap';

import { xsValues } from '../../constants';
import { IOrder, IParams } from '../../interfaces';
import { IFuncVoid, ISortingReverse } from '../../types';
import { Order } from '../Order/Order';
import { commentActions, orderActions } from '../../redux';
import { OrderPlaceholder } from '../OrderPlaceholder/OrderPlaceholder';
import { useAppDispatch, useAppSelector } from '../../hooks';

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, sorted, loading, ordersLimit, orderTrigger } = useAppSelector(state => state.orderReducer);
    const { commentTrigger } = useAppSelector(state => state.commentReducer);
    const [orderId, setOrderId] = useState<number>(null);
    const [query, setQuery] = useSearchParams();
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page'),
            sorting_by: query.get('order_by'),
            name: query.get('name'),
            surname: query.get('surname'),
            email: query.get('email'),
            phone: query.get('phone'),
            age: query.get('age'),
            course: query.get('course'),
            course_format: query.get('course_format'),
            course_type: query.get('course_type'),
            status: query.get('status'),
            group: query.get('group'),
            created_at_after: query.get('created_after'),
            created_at_before: query.get('created_before'),
            manager: query.get('manager'),
        }, 500);
    const debouncedParamsString = JSON.stringify(debouncedParams);
    const sortingOrderBy: ISortingReverse = (order_by: string) => {
        query.set('page', '1');
        query.set('order_by', sorted ? order_by : `-${order_by}`);
        setQuery(query);
        dispatch(orderActions.setOrderByParams());
    };
    const orderById: IFuncVoid = (): void => sortingOrderBy('id');
    const orderByName: IFuncVoid = (): void => sortingOrderBy('name');
    const orderBySurname: IFuncVoid = (): void => sortingOrderBy('surname');
    const orderByEmail: IFuncVoid = (): void => sortingOrderBy('email');
    const orderByPhone: IFuncVoid = (): void => sortingOrderBy('phone');
    const orderByAge: IFuncVoid = (): void => sortingOrderBy('age');
    const orderByCourse: IFuncVoid = (): void => sortingOrderBy('course');
    const orderByCourseFormat: IFuncVoid = (): void => sortingOrderBy('course_format');
    const orderByCourseType: IFuncVoid = (): void => sortingOrderBy('course_type');
    const orderByStatus: IFuncVoid = (): void => sortingOrderBy('status');
    const orderBySum: IFuncVoid = (): void => sortingOrderBy('sum');
    const orderByAlreadyPaid: IFuncVoid = (): void => sortingOrderBy('alreadyPaid');
    const orderByCreatedAt: IFuncVoid = (): void => sortingOrderBy('created_at');
    const orderByGroup: IFuncVoid = (): void => sortingOrderBy('group');
    const orderByManager: IFuncVoid = (): void => sortingOrderBy('manager');
    const orderOpen: (order: IOrder) => void = (order: IOrder): void => {
        if (order.id === orderId) {
            setOrderId(null);
        } else {
            setOrderId(order.id);
            dispatch(commentActions.setResetError());
        }
    };
    const places: ReactElement[] = Array.from({ length: ordersLimit }, (_: ReactElement, index) => (
        <OrderPlaceholder key={ index } xss={ xsValues } />
    ));
    useEffect(() => {
        dispatch(orderActions.setPage(+query.get('page')));
        if (query.get('order_by')) {
            dispatch(orderActions.setDefaultSorted(!!query.get('order_by').includes('-')));
        }
        if (query.get('manager')) {
            dispatch(orderActions.setDefaultCheckBox());
        }
        dispatch(orderActions.setSortingBy(query.get('order_by')));
        setOrderId(null);
    }, [dispatch, query, sorted]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(orderActions.setOrdersDefault());
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, debouncedParamsString, orderTrigger, commentTrigger]);

    return (
        <div style={{ 'height': '90%' }}>
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
                    loading
                        ?
                        places.map((place: ReactElement) => place)
                        :
                        orders.map(order =>
                            <Order
                                key={ order.id }
                                order={ order }
                                isOpen={ order.id === orderId }
                                onClick={ () => orderOpen(order) }
                            />)
                }
                </tbody>
            </Table>
        </div>
    );
};

export {
    Orders
};