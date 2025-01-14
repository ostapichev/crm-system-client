import { FC } from 'react';

import { Button, Image, ListGroup, Modal } from 'react-bootstrap';

import { Comment } from '../Comment/Comment';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IComment, IOrder, IPagination } from '../../interfaces';
import { PaginationApp } from '../PaginationApp/PaginationApp';
import { commentActions } from '../../redux';
import { IFuncValueString, IFuncVoid } from '../../types';

import { okten_school_image } from '../../assets';

interface IProps {
    order: IOrder;
    handleCloseComments: IFuncVoid;
    showComments: boolean;
}

const Comments: FC<IProps> = ({ order, showComments, handleCloseComments }) => {
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
            onHide={ handleCloseComments }
            backdrop='static'
            keyboard={ false }
            size='xl'
            centered
            scrollable
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'aliceblue', height: '300px' }}>
                <ListGroup>
                    <ListGroup.Item variant='success'>
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
            <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                <Button variant='secondary' onClick={ handleCloseComments }>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    Comments
};
