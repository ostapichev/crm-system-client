import { FC, Fragment } from 'react';

import { DateFormat } from '../DateFormat/DateFormat';
import { IGroup, IOrder } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { IFuncValueNumberString, IFuncVoid } from '../../types/func.type';
import { dataInsert } from '../../utils';
import { OrderDetails } from '../OrderDetails/OrderDetails';

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
        already_paid,
        created_at,
        group_id,
        manager,
    } = order;
    const getNameGroup: IFuncValueNumberString = (group_id: number | null): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group) return dataInsert(group.name);
        return 'no group';
    };

    return (
        <Fragment>
            <tr onClick={ () => onClick() }>
                <td>{ dataInsert( typeof id === 'string' ? id : id.toString()) }</td>
                <td>{ dataInsert(name) }</td>
                <td>{ dataInsert(surname) }</td>
                <td>{ dataInsert(email) }</td>
                <td>{ dataInsert(phone) }</td>
                <td>{ dataInsert(age?.toString()) }</td>
                <td>{ dataInsert(course?.toString()) }</td>
                <td>{ dataInsert(course_format?.toString()) }</td>
                <td>{ dataInsert(course_type?.toString()) }</td>
                <td>{ dataInsert(status?.toString()) }</td>
                <td>{ dataInsert(sum?.toString()) }</td>
                <td>{ dataInsert(already_paid?.toString()) }</td>
                <td>{ <DateFormat originalDate={ created_at } /> }</td>
                <td>{ getNameGroup(group_id) }</td>
                <td>{ dataInsert(manager?.surname) }</td>
            </tr>
            <OrderDetails order={ order } isOpen={ isOpen} />
        </Fragment>
    );
};

export {
    Order
};
