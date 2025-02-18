import { FC, Fragment, MouseEventHandler, useEffect, useState } from 'react';

import { Alert, Badge, Button, Card, Placeholder, Row } from 'react-bootstrap';

import { urls } from '../../constants';
import { DateFormat } from '../DateFormat/DateFormat';
import { IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { adminPanelActions } from '../../redux';

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [activate, setActivate] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>(null);
    const { activateUser, loading } = useAppSelector(state => state.adminPanelReducer);
    const userStats = useAppSelector(state =>
        state.adminPanelReducer.userStatistic[user.id]) || {};
    const { id, name, surname, email, is_active, last_login } = user;
    const { orders, in_work, agree, disagree, dubbing } = userStats;
    const ban: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        await dispatch(adminPanelActions.ban({ id }));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        await dispatch(adminPanelActions.unban({ id }));
    };
    const getLinkActivate: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        await dispatch(adminPanelActions.getActivateUser({ id }));
        setActivate(true);
    };
    const copyToClipboard: MouseEventHandler<HTMLButtonElement> = async (): Promise<void> => {
        if (!activateUser || !activateUser.activateToken) {
            dispatch(adminPanelActions.setErrorActivation(`Activate user ${surname} data is missing, user id: ${id}`));
            return;
        }
        const link = `${urls.localURL.activate}/${activateUser.activateToken}`;
        await navigator.clipboard.writeText(link)
            .then(() => setButtonText('Link copied to clipboard!'));
            setTimeout(() => {
                setButtonText(null);
            }, 5000);
        setActivate(false);
    };
    useEffect(() => {
        dispatch(adminPanelActions.getStatisticUser({ id }));
    }, [dispatch, id]);

    return (
        <Card
            bg='light'
            text='dark'
            className='m-2'
            style={{ width: '49%' }}
        >
            {
                loading
                    ?
                    <Fragment>
                        <Card.Header>
                            <Placeholder as='strong' className='mb-1' animation='glow'>
                                <Placeholder xs={1} />
                            </Placeholder>
                        </Card.Header>
                        <Card.Body className='d-flex'>
                            <Row style={{ width: '40%'}} className='m-0'>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={5} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={4} />
                                </Placeholder>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={6} />
                                </Placeholder>
                            </Row>
                            <Row className='w-25'>
                                <Placeholder as={ Card.Text } className='mb-1' animation='glow'>
                                    <Placeholder xs={5} />
                                </Placeholder>
                            </Row>
                            <Row className='w-25 m-0 d-flex flex-column justify-content-start'>
                                <Placeholder as={ Button } className='mb-1' animation='glow'>
                                    <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder as={ Button } className='mb-1' animation='glow'>
                                    <Placeholder xs={8} />
                                </Placeholder>
                            </Row>
                        </Card.Body>
                    </Fragment>
                    :
                    <Fragment>
                        <Card.Header>
                            <Fragment>
                                <h5 className='mb-0'>ID&#58;&nbsp;<strong>{ id }</strong></h5>
                            </Fragment>
                        </Card.Header>
                        <Card.Body className='d-flex'>
                            <Row style={{ width: '40%'}} className='m-0'>
                                <Card.Text className='mb-1'>name&#58;&nbsp;<strong>{ name }</strong></Card.Text>
                                <Card.Text className='mb-1'>surname&#58;&nbsp;<strong>{ surname }</strong></Card.Text>
                                <Card.Text className='mb-1'>email&#58;&nbsp;<strong>{ email }</strong></Card.Text>
                                <Card.Text className='mb-1'>is&nbsp;active:&#58;&nbsp;
                                    <strong>{ is_active.toString() }</strong>
                                </Card.Text>
                                <Card.Text className='mb-1'>last&nbsp;login&#58;&nbsp;
                                    <strong>{ last_login ? <DateFormat originalDate={ last_login } /> : 'no data' }</strong>
                                </Card.Text>
                            </Row>
                            <Row className='w-25 d-flex flex-column justify-content-start'>
                                <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-center'>
                                    <strong>total&#58;&nbsp;</strong>
                                    <Badge bg='success' pill>
                                        { orders }
                                    </Badge>
                                </Card.Text>
                                {
                                    in_work > 0 &&
                                    <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-center'>
                                        <strong>in&nbsp;work&#58;&nbsp;</strong>
                                        <Badge bg='primary' pill>
                                            { in_work }
                                        </Badge>
                                    </Card.Text>
                                }
                                {
                                    agree > 0 &&
                                    <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-center'>
                                        <strong>agree&#58;&nbsp;</strong>
                                        <Badge bg='primary' pill>
                                            { agree }
                                        </Badge>
                                    </Card.Text>
                                }
                                {
                                    disagree > 0 &&
                                    <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-center'>
                                        <strong>disagree&#58;&nbsp;</strong>
                                        <Badge bg='primary' pill>
                                            { disagree }
                                        </Badge>
                                    </Card.Text>
                                }
                                {
                                    dubbing > 0 &&
                                    <Card.Text className='m-1 w-75 d-flex justify-content-between align-items-center'>
                                        <strong>dubbing&#58;&nbsp;</strong>
                                        <Badge bg='primary' pill>
                                            { dubbing }
                                        </Badge>
                                    </Card.Text>
                                }
                            </Row>
                            <Row className='w-25 m-0 d-flex flex-column justify-content-start'>
                                <Button
                                    type='button'
                                    className='h-25 m-1'
                                    variant={ is_active ? 'outline-danger' : 'outline-primary' }
                                    onClick={(event) => is_active === true ? ban(event) : unban(event)}
                                >
                                    { is_active ? 'ban' : 'unban' }
                                </Button>
                                {
                                    is_active
                                        ?
                                        <Button
                                            variant='outline-warning'
                                            type='button'
                                            className='h-25 m-1'
                                            onClick={ !activate ? getLinkActivate : copyToClipboard }
                                        >
                                            { !activate ? 'recovery password' : 'copy to clipboard' }
                                        </Button>
                                        :
                                        <Button
                                            variant='outline-success'
                                            type='button'
                                            className='h-25 m-1'
                                            onClick={ !activate ? getLinkActivate : copyToClipboard }
                                        >
                                            { !activate ? 'get activate' : 'copy to clipboard' }
                                        </Button>
                                }
                                {
                                    buttonText &&
                                    <Alert variant='success' className='h-25 m-1 p-1 text-center'>
                                        Link copied to clipboard!
                                    </Alert>
                                }
                            </Row>
                        </Card.Body>
                    </Fragment>
            }
        </Card>
    );
};

export {
    User
};
