import { FC, Fragment, useState } from 'react';

import { Badge, Button, Form, ListGroup, Modal, Placeholder, Stack } from 'react-bootstrap';

import { Comment } from '../Comment/Comment';
import { IComment, IGroup, IOrder } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { IFuncVoid } from '../../types/func.type';
import { dataInsert } from '../../utils';
import { DateFormat } from '../DateFormat/DateFormat';

interface IProps {
    order: IOrder;
    onClick: IFuncVoid;
    isOpen: boolean;
}

const OrderCollapse: FC<IProps> = ({ order, onClick, isOpen }) => {
    const [showComments, setShowCommnets] = useState<boolean>(false);
    const { loading } = useAppSelector(state => state.orderReducer);
    const { groups } = useAppSelector(state => state.groupReducer);
    const { startShowComment, endShowComments, errorsComment } = useAppSelector(state => state.commentReducer);
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
    const handleClose = () => {
        setShowCommnets(false);
    }
    const handleShow = () => {
        setShowCommnets(true);
    }
    const paginateComments: IComment[] = comments.slice(startShowComment, endShowComments);
    
    return (
        <Fragment>
            <tr onClick={() => onClick()}>
                <td>
                    {
                        loading
                            ?
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                            <Placeholder as='p' animation='glow'>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', backgroundColor: 'snow' }}>
                        <div className='d-flex flex-column justify-content-start w-25'>
                            <Badge pill bg='success' className='m-1'>
                                msg: { dataInsert(msg) }
                            </Badge>
                            <Badge pill bg='success' className='m-1'>
                                UTM: { dataInsert(utm) }
                            </Badge>
                            <Button variant='outline-primary' className='m-1 w-50'>edit</Button>
                        </div>
                        <div className='w-50'>
                            <div className='text-start'>
                                <h5>{ comments.length > 1 ? 'Comments:' : 'No comments' }</h5>
                                <ListGroup onClick={ () => handleShow() } className={ comments.length > 1 ? 'mt-2 mb-3 d-block' : 'd-none' }>
                                    <ListGroup.Item action variant="success">
                                        { comments &&
                                            lastComments.map(comment => <Comment
                                                key={ comment.id }
                                                comment={ comment }
                                                isOpen={ false }
                                            />)
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            <Modal
                                show={ showComments }
                                onHide={ handleClose }
                                backdrop="static"
                                keyboard={ false }
                                size="lg"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ListGroup>
                                        <ListGroup.Item variant='info'>
                                            { 
                                                comments &&
                                                paginateComments.map(comment => <Comment
                                                    key={ comment.id }
                                                    comment={ comment }
                                                    isOpen={ true }
                                                />)
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={ handleClose }>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Stack direction='horizontal' gap={1} className='w-50'>
                                <Form.Control className='me-auto' placeholder='Add comment' />
                                <Button variant='primary'>add</Button>
                            </Stack>
                        </div>
                    </div>
                </td>
            }
        </Fragment>
    );
};

export {
    OrderCollapse
};
