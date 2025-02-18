import { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Col, Container, Form, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IParams } from '../../interfaces';
import { orderActions } from '../../redux';
import { orderService } from '../../services';
import { IFuncVoid } from '../../types';

const ButtonBlock: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const { me } = useAppSelector(state => state.authReducer);
    const { checkbox, totalOrders } = useAppSelector(state => state.orderReducer);
    const [hoverReload, setHoverReload] = useState<boolean>(false);
    const [hoverCreateOrder, setHoverCreateOrder] = useState<boolean>(false);
    const [hoverCreateExel, setHoverCreateExel] = useState<boolean>(false);
    const myHandler: IFuncVoid = (): void => {
        dispatch(orderActions.setCheckBox());
        query.set('page', '1');
        if (checkbox) {
            query.set('manager', me.id.toString());
            orderService.setCheckBoxLocalData();
        } else {
            query.delete('manager');
            orderService.removeCheckBoxLocalData();
        }
        setQuery(query);
    };
    const myCheck: boolean = orderService.getCheckBoxLocalData();
    const reset: IFuncVoid = (): void => {
        dispatch(orderActions.setDefault());
        navigate('/orders');
    };
    const create: IFuncVoid = (): void => {
        dispatch(orderActions.setCreateOrder());
    };
    const getFile: IFuncVoid = async (): Promise<void> => {
        const params: IParams = {
            limit: totalOrders,
            sorting_by: query.get('order_by'),
            name: query.get('name'),
            surname: query.get('surname'),
            email: query.get('email'),
            phone: query.get('phone'),
            age: query.get('age'),
            course: query.get('course'),
            course_format: query.get('course_format'),
            course_type: query.get('course_type'),
            status: query.get('status'),
            created_at_after: query.get('created_at_after'),
            created_at_before: query.get('created_at_before'),
            group: query.get('group'),
            manager: query.get('manager'),
        };
        await dispatch(orderActions.getExelFile({ params }));
    }

    return (
        <Stack className='d-flex flex-column justify-content-center align-items-center'>
            <Form.Group
                className='m-2'
                style={{ fontSize: '1.2rem' }}
                controlId='formBasicCheckbox'
            >
                <Form.Check 
                    type='checkbox' 
                    label='My orders' 
                    onChange={ myHandler }
                    checked={ !!myCheck }
                />
            </Form.Group>
            <Container fluid>
                <Row className='d-flex flex-row justify-content-md-center'>
                    <Col
                        md='auto'
                        onMouseEnter={ (): void => setHoverReload(true) }
                        onMouseLeave={ (): void => setHoverReload(false) }
                        onClick={ reset }
                    >
                        {
                            hoverReload
                                ?
                                <OverlayTrigger
                                    key='bottom'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-bottom'>
                                            <strong>reset&nbsp;filter</strong>
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className='bi bi-arrow-clockwise'
                                        style={{
                                            fontFamily: 'Bootstrap Icons',
                                            transform: 'rotate(90deg)',
                                            transformOrigin: 'center',
                                            fontSize: '2rem',
                                            display: 'inline-block',
                                            cursor: 'pointer'
                                        }}
                                    ></i>
                                </OverlayTrigger>
                                :
                                <i
                                    className='bi bi-arrow-clockwise'
                                    style={{ fontSize: '2rem', cursor: 'pointer' }}
                                ></i>
                        }
                    </Col>
                    <Col
                        md='auto'
                        onMouseEnter={ (): void => setHoverCreateOrder(true) }
                        onMouseLeave={ (): void => setHoverCreateOrder(false) }
                        onClick={ create }
                    >
                        {
                            hoverCreateOrder
                                ?
                                <OverlayTrigger
                                    key='bottom'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-bottom'>
                                            <strong>create&nbsp;order</strong>
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className='bi bi-database-add'
                                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                                    ></i>
                                </OverlayTrigger>
                                :
                                <i
                                    className='bi bi-database-fill-add'
                                    style={{ fontSize: '2rem', cursor: 'pointer' }}
                                ></i>
                        }
                    </Col>
                    <Col
                        md='auto'
                        onMouseEnter={ (): void => setHoverCreateExel(true) }
                        onMouseLeave={ (): void => setHoverCreateExel(false) }
                        onClick={ getFile }
                    >
                        {
                            hoverCreateExel
                                ?
                                <OverlayTrigger
                                    key='bottom'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-bottom'>
                                            <strong>create&nbsp;exel&nbsp;file</strong>
                                        </Tooltip>
                                    }
                                >
                                    <i
                                        className='bi bi-file-earmark-excel'
                                        style={{ fontSize: '2rem', cursor: 'pointer' }}
                                    ></i>
                                </OverlayTrigger>
                                :
                                <i
                                    className='bi bi-file-earmark-excel-fill'
                                    style={{ fontSize: '2rem', cursor: 'pointer' }}
                                ></i>
                        }
                    </Col>
                </Row>
            </Container>
        </Stack>
    );
};

export {
    ButtonBlock
};
