import { FC, Fragment, useState } from 'react';

import { Alert, Badge, Button, ListGroup } from 'react-bootstrap';

import { Comment } from '../Comment/Comment';
import { CommentForm } from '../CommentForm/CommentForm';
import { Comments } from '../Comments/Comments';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IComment, IOrder } from '../../interfaces';
import { IFuncVoid } from '../../types';
import { commentActions, orderActions } from '../../redux';
import { dataInsert } from '../../utils';

import css from './OrderDetails.module.css';

interface IProps {
    order: IOrder;
    isOpen: boolean;
}

const OrderDetails: FC<IProps> = ({ order, isOpen }) => {
    const dispatch = useAppDispatch();
    const [showComments, setShowComments] = useState<boolean>(false);
    const { msg, utm, comments, manager } = order;
    const { me } = useAppSelector(state => state.authReducer);
    const { pageComments, errorsComment } = useAppSelector(state => state.commentReducer);
    const lastComments: IComment[] = comments.slice(0, 3);
    const setUpdate: IFuncVoid = () => {
        dispatch(orderActions.setOrderUpdate(order));
    };
    const handleCloseComments: IFuncVoid = (): void => setShowComments(false);
    const handleShowComments: IFuncVoid = (): void => {
        setShowComments(true);
        if (pageComments !== 1) dispatch(commentActions.setPage(1));
    };
    const isOwner: boolean = manager && manager?.id !== me?.id;

    return (
        <Fragment>
            {
                isOpen &&
                <tr>
                    <td colSpan={15}>
                        <div className={ css.Details }>
                            <div className='d-flex flex-column justify-content-start w-25'>
                                <div className='text-start'>
                                    <Badge pill bg='success' className='m-1'>msg</Badge>
                                    <strong>{ dataInsert(msg?.toString()) }</strong>
                                </div>
                                <div className='text-start'>
                                    <Badge pill bg='success' className='m-1'>utm</Badge>
                                    <strong>{ dataInsert(utm?.toString()) }</strong>
                                </div>
                                <Button
                                    onClick={ setUpdate }
                                    variant='outline-primary'
                                    className='m-1 w-50'
                                    disabled={ isOwner }
                                >
                                    edit
                                </Button>
                                {
                                    isOwner &&
                                    <Alert key='warning' variant='warning'>
                                        You&#160;can't&#160;write&#160;comment&#160;and&#160;
                                        edit&#160;this&#160;order&#46;&#160;It&#160;
                                        belongs&#160;to&#160;another&#160;manager&#46;
                                    </Alert>
                                }
                                {
                                    errorsComment &&
                                    <Alert key='danger' variant='danger'>
                                        { errorsComment.messages }
                                    </Alert>
                                }
                            </div>
                            <div className='w-50'>
                                <div className='text-start'>
                                    <h5>{ comments.length ? 'Comments:' : 'No comments' }</h5>
                                    <ListGroup
                                        onClick={ () => handleShowComments() }
                                        className={ comments.length ? 'mt-2 mb-3 d-block' : 'd-none' }
                                    >
                                        <ListGroup.Item action variant='success'>
                                            {
                                                comments.length &&
                                                lastComments.map(comment =>
                                                    <Comment
                                                        key={ comment.id }
                                                        comment={ comment }
                                                        isOpen={ false }
                                                    />)
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <CommentForm order_id={ order.id } isOwner={ isOwner } />
                            </div>
                        </div>
                        <Comments
                            order={ order }
                            handleCloseComments={ handleCloseComments }
                            showComments={ showComments }
                        />
                    </td>
                </tr>
            }
        </Fragment>
    )
};

export {
    OrderDetails
};
