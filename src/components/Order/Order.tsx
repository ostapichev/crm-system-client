import { FC, Fragment } from 'react';

import { DateFormat } from '../DateFormat/DateFormat';
import { IGroup, IOrder } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IFuncValueNumberString, IFuncVoid } from '../../types';
import { dataInsertUtil } from '../../utils';

interface IProps {
    order: IOrder;
    onClick: IFuncVoid;
    isOpen: boolean;
}

const Order: FC<IProps> = ({ order, onClick, isOpen }) => {
    const { groups } = useAppSelector(state => state.groupReducer);
    const {
        id,
        name,
        surname,
        email,
        phone,
        age,
        course,
        course_format,
        course_type,
        status,
        sum,
        alreadyPaid,
        created_at,
        group_id,
        manager,
    } = order;
    const getNameGroup: IFuncValueNumberString = (group_id: number | null): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group) return dataInsertUtil(group.name);
        return 'no group';
    };

    return (
        <Fragment>
            <tr onClick={ () => onClick() }>
                <td>{ dataInsertUtil( id.toString()) }</td>
                <td>{ dataInsertUtil(name) }</td>
                <td>{ dataInsertUtil(surname) }</td>
                <td>{ dataInsertUtil(email) }</td>
                <td>{ dataInsertUtil(phone) }</td>
                <td>{ dataInsertUtil(age?.toString()) }</td>
                <td>{ dataInsertUtil(course?.toString()) }</td>
                <td>{ dataInsertUtil(course_format?.toString()) }</td>
                <td>{ dataInsertUtil(course_type?.toString()) }</td>
                <td>{ dataInsertUtil(status?.toString()) }</td>
                <td>{ dataInsertUtil(sum?.toString()) }</td>
                <td>{ dataInsertUtil(alreadyPaid?.toString()) }</td>
                <td>{ <DateFormat originalDate={ created_at } /> }</td>
                <td>{ getNameGroup(group_id) }</td>
                <td>{ dataInsertUtil(manager?.surname) }</td>
            </tr>
            <OrderDetails order={ order } isOpen={ isOpen } />
        </Fragment>
    );
};

export {
    Order
};
