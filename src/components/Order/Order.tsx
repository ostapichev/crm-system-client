import { FC, Fragment, useState } from 'react';

import { Collapse, Placeholder, Table } from 'react-bootstrap';

import { Comment } from '../Comment/Comment';
import { DateFormat } from '../DateFormat/DateFormat';
import { useAppSelector } from '../../hooks';
import { IComment, IGroup, IOrder } from '../../interfaces';
import { IFuncVoid } from '../../types';
import { dataInsert } from '../../utils';

import css from './Order.module.css';

interface IProps {
    order: IOrder;
    onClick: IFuncVoid;
    isOpen: boolean;
}

const Order: FC<IProps> = ({ order, onClick, isOpen }) => {
    const { loading } = useAppSelector(state => state.orderReducer);
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
        msg,
        utm,
        comments,
    } = order;
    const getNameGroup = (group_id: number | null): string => {
        const group: IGroup = groups.find(group => group.id === group_id);
        if (group) return dataInsert(group.name);
        return 'no group';
    };
    const lastComments: IComment[] = comments.slice(0, 3);

    return (
        <Fragment>
            <tr onClick={() => onClick()}>
                <td>
                    {
                        loading
                            ?
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={6}/>
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
                                <Placeholder xs={12}/>
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
                                <Placeholder xs={10}/>
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
                                <Placeholder xs={12}/>
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
                                <Placeholder xs={10}/>
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
                                <Placeholder xs={6}/>
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
                                <Placeholder xs={8}/>
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
                                <Placeholder xs={8}/>
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
                                <Placeholder xs={8}/>
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
                                <Placeholder xs={12}/>
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
                                <Placeholder xs={6}/>
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
                                <Placeholder xs={6}/>
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
                                <Placeholder xs={10}/>
                            </Placeholder>
                            :
                            <DateFormat originalDate={created_at}/>
                    }
                </td>
                <td>
                    {
                        loading
                            ?
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={6}/>
                            </Placeholder>
                            :
                            getNameGroup(group_id)
                    }
                </td>
                <td>
                    {
                        loading
                            ?
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={6}/>
                            </Placeholder>
                            :
                            dataInsert(manager?.surname)
                    }
                </td>
            </tr>
            { 
                isOpen &&
                <td colSpan={15}>
                    <Table borderless striped>
                        <tbody>
                            <tr>
                                <td>{ dataInsert(msg) }</td>
                                <td>{ dataInsert(utm) }</td>
                                <td>
                                {
                                    comments &&
                                    lastComments.map(comment => <Comment
                                        key={ comment.id }
                                        comment={ comment }
                                        isOpen={ false }
                                    />)
                                }
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </td>
            }

        </Fragment>
    )
        ;
};

export {
    Order
};
