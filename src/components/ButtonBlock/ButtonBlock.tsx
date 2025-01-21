import { FC, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import { Col, Container, Form, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from "../../hooks";
import { orderActions } from "../../redux";
import { IFuncVoid } from "../../types";

const ButtonBlock: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const { me } = useAppSelector(state => state.authReducer);
    const { checkbox } = useAppSelector(state => state.orderReducer);
    const [hoverReload, setHoverReload] = useState<boolean>(false);
    const [hoverCreateOrder, setHoverCreateOrder] = useState<boolean>(false);
    const [hoverCreateExel, setHoverCreateExel] = useState<boolean>(false);
    const handler: IFuncVoid = () => {
        dispatch(orderActions.setCheckBox());
        query.set('page', '1');
        if (checkbox) {
            query.set('manager', me.id.toString());
            localStorage.setItem('checkbox', 'checked');
        } else {
            query.delete('manager');
            localStorage.removeItem('checkbox');
        }
        setQuery(query);
    };
    const reset: IFuncVoid = (): void => {
        dispatch(orderActions.setDefault());
        localStorage.removeItem('checkbox');
        navigate('/orders');
    };

    return (
        <Stack className='d-flex justify-content-center align-items-center'>
            <Form.Group
                className='m-2'
                style={{ fontSize: '1.2rem' }}
                controlId='formBasicCheckbox'
            >
                <Form.Check 
                    type='checkbox' 
                    label='My orders' 
                    onChange={ handler } 
                    checked={ !!localStorage.getItem('checkbox') } 
                />
            </Form.Group>
            <Container fluid>
                <Row className='d-flex justify-content-md-center'>
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
                                            <strong>reset filter</strong>
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
                    >
                        {
                            hoverCreateOrder
                                ?
                                <OverlayTrigger
                                    key='bottom'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-bottom'>
                                            <strong>create order</strong>
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
                    >
                        {
                            hoverCreateExel
                                ?
                                <OverlayTrigger
                                    key='bottom'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-bottom'>
                                            <strong>create exel file</strong>
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
