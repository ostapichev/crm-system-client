import { FC, useEffect } from 'react';

import { Card, Col, Container, Placeholder, Row } from 'react-bootstrap';

import { StatusEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { adminPanelActions } from '../../redux';

const StatisticOrders: FC = () => {
    const dispatch = useAppDispatch();
    const { totalOrders, loading } = useAppSelector(state => state.orderReducer);
    const { orderStatistic, totalUsers } = useAppSelector(state => state.adminPanelReducer);
    const { agree, disagree, in_work, dubbing, news, status_null } = orderStatistic;
    useEffect(() => {
        dispatch(adminPanelActions.getStatisticOrder());
    }, [dispatch]);
    
    return (
        <Container className='pt-3 pb-3' fluid>
            <Row className='d-flex flex-row justify-content-space-around'>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>users</Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ totalUsers }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>orders</Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ totalOrders }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>
                                        { StatusEnum.AGREE }
                                    </Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ agree }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>{ StatusEnum.NEW }</Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ news }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>
                                        { StatusEnum.IN_WORK }
                                    </Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ in_work }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>
                                        { StatusEnum.DUBBING }
                                    </Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ dubbing }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>
                                        { StatusEnum.DISAGREE }
                                    </Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-0 p-0' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ disagree }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <Card
                        bg='info'
                        key='Info'
                        text='white'
                        style={{ width: '10rem', height: '90%' }}
                        className='m-2'
                    >
                        <Card.Header>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-0' as={ Card.Title } animation='glow'>
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    :
                                    <Card.Title className='text-center fs-4 fw-bold m-0'>
                                        { StatusEnum.NULL }
                                    </Card.Title>
                            }
                        </Card.Header>
                        <Card.Body className='text-center p-0'>
                            {
                                loading
                                    ?
                                    <Placeholder className='text-center m-1 p-1' as={ Card.Body } animation='glow'>
                                        <Placeholder className='m-1' xs={4} />
                                    </Placeholder>
                                    :
                                    <Card.Text className='m-1 fs-5'>{ status_null }</Card.Text>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export {
    StatisticOrders
};
