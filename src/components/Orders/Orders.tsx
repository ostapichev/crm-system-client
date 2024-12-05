import { FC, Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { Table } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IParams } from '../../interfaces';
import { orderActions } from '../../redux';
import { Order } from '../Order/Order';

const Orders: FC = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(state => state.orderReducer);
    const [query] = useSearchParams();
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page'),
            order_by: query.get('order_by'),
        }, 500);
    const debouncedParamsString = JSON.stringify(debouncedParams);
    useEffect(() => {
        dispatch(orderActions.setPage(+query.get('page')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(orderActions.getAll({ params }));
    }, [dispatch, debouncedParamsString]);

    return (
        <Fragment>
            <Table className='text-center' size='sm' striped bordered>
                <thead>
                    <tr>
                        <th className='bg-success-subtle'>id</th>
                        <th className='bg-success-subtle'>name</th>
                        <th className='bg-success-subtle'>surname</th>
                        <th className='bg-success-subtle'>email</th>
                        <th className='bg-success-subtle'>phone</th>
                        <th className='bg-success-subtle'>age</th>
                        <th className='bg-success-subtle'>course</th>
                        <th className='bg-success-subtle'>course_format</th>
                        <th className='bg-success-subtle'>course_type</th>
                        <th className='bg-success-subtle'>status</th>
                        <th className='bg-success-subtle'>sum</th>
                        <th className='bg-success-subtle'>alreadyPaid</th>
                        <th className='bg-success-subtle'>created_at</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => <Order key={ order.id } order={order} />)
                }
                </tbody>
            </Table>
        </Fragment>
    );
};

export {
    Orders
};
