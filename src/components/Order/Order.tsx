import { FC } from 'react';

import { Placeholder } from 'react-bootstrap';

import { DateFormat } from '../DateFormat/DateFormat';
import { useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { dataInsert } from '../../utils';

interface IProps {
    order: IOrder;
}

const Order: FC<IProps> = ({ order }) => {
    const { loading } = useAppSelector(state => state.orderReducer);
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

    return (
        <tr>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        :
                        dataInsert(id.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        :
                        dataInsert(name)
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={10} />
                        </Placeholder>
                        :
                        dataInsert(surname)
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        :
                        dataInsert(email)
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={10} />
                        </Placeholder>
                        :
                        dataInsert(phone)
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        :
                        dataInsert(age?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={8} />
                        </Placeholder>
                        :
                        dataInsert(course?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={8} />
                        </Placeholder>
                        :
                        dataInsert(course_format?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={8} />
                        </Placeholder>
                        :
                        dataInsert(course_type?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        :
                        dataInsert(status?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        :
                        dataInsert(sum?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        :
                        dataInsert(already_paid?.toString())
                }
            </td>
            <td>
                {
                    loading
                        ?
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={10} />
                        </Placeholder>
                        :
                        <DateFormat originalDate={ created_at } />
                }
            </td>
        </tr>
    );
};

export {
    Order
};
