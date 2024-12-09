import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { Table } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IParams } from '../../interfaces';
import { Order } from '../Order/Order';
import { orderActions } from '../../redux';
import { IFuncVoid, ISortingReverse } from '../../types';

import css from './Orders.module.css';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const { orders, sorted } = useAppSelector(state => state.orderReducer);
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
    useEffect(() => {
        dispatch(orderActions.setPage(+query.get('page')));
        dispatch(orderActions.setSorting(query.get('sorting')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, debouncedParamsString]);

    return (
        <Table className='text-center' size='sm' striped bordered>
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
                </tr>
            </thead>
            <tbody>
            {
                orders.map(order => <Order key={ order.id } order={ order }/>)
            }
            </tbody>
        </Table>
    );
};

export {
    Orders
};
