import { FC } from 'react';

import { Button, ListGroup, Modal } from 'react-bootstrap';

import { Comment } from '../Comment/Comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IComment, IOrder, IPagination } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { commentActions } from '../../redux';
import { IFuncValueString, IFuncVoid } from '../../types';

interface IProps {
    order: IOrder;
    handleClose: IFuncVoid;
    showComments: boolean;
}

const Comments: FC<IProps> = ({ order, showComments, handleClose }) => {
    const dispatch = useAppDispatch();
    const { comments } = order;
    const {
        startShowComment,
        endShowComments,
        commentsLimit,
        pageComments,
    } = useAppSelector(state => state.commentReducer);
    const pageChanger: IFuncValueString = (value: string): void => {
        if (value === '&lsaquo;') {
            if (+pageComments !== 1) {
                dispatch(commentActions.setPage(+pageComments - 1));
            }
        } else if (value === '&rsaquo;') {
            dispatch(commentActions.setPage(+pageComments + 1));
        } else {
            dispatch(commentActions.setPage(+value));
        }
    };
    const paginateComments: IComment[] = comments.slice(startShowComment, endShowComments);
    const dataPagination: IPagination = {
        page: pageComments,
        totalPages: Math.ceil(comments.length / commentsLimit),
        limit: endShowComments,
        siblings: 2,
        isOpenComments: showComments,
        pageChanger,
    };
    
    return (
        <Modal
            show={ showComments }
            onHide={ handleClose }
            backdrop='static'
            keyboard={ false }
            size='xl'
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '300px' }}>
                <ListGroup>
                    <ListGroup.Item variant='info'>
                        {
                            comments &&
                            paginateComments.map(comment =>
                                <Comment
                                    key={ comment.id }
                                    comment={ comment }
                                    isOpen={ true }
                                />)
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            {
                comments.length > commentsLimit &&
                <Modal.Body>
                    <PaginationApp dataPagination={ dataPagination } />
                </Modal.Body>
            }
            <Modal.Footer>
                <Button variant='secondary' onClick={ handleClose }>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    Comments
};
