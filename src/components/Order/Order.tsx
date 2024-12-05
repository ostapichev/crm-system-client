import { FC } from 'react';

import { DateFormat } from '../DateFormat/DateFormat';
import { IOrder } from '../../interfaces';

interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({ order }) => {
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
    } = order;
    const dataInsert = (data: string): string => {
        if (data) return data;
        return 'no data';
    };

    return (
        <tr>
            <td>{ dataInsert(id?.toString()) }</td>
            <td>{ dataInsert(name?.toString()) }</td>
            <td>{ dataInsert(surname?.toString()) }</td>
            <td>{ dataInsert(email?.toString()) }</td>
            <td>{ dataInsert(phone?.toString()) }</td>
            <td>{ dataInsert(age?.toString()) }</td>
            <td>{ dataInsert(course?.toString()) }</td>
            <td>{ dataInsert(course_format?.toString()) }</td>
            <td>{ dataInsert(course_type?.toString()) }</td>
            <td>{ dataInsert(status?.toString()) }</td>
            <td>{ dataInsert(sum?.toString()) }</td>
            <td>{ dataInsert(already_paid?.toString()) }</td>
            <td>{ <DateFormat originalDate={ created_at } /> }</td>
        </tr>
    );
};

export {
    Order
};
