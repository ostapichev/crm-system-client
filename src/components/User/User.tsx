import { FC, Fragment, MouseEventHandler, useState}  from 'react';

import { Alert, Button, Card, Placeholder, Row } from 'react-bootstrap';

import { urls } from "../../constants";
import { DateFormat } from "../DateFormat/DateFormat";
import { IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminPanelActions } from "../../redux";
import { StatisticUser } from "../StatisticUser/StatisticUser";

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [activate, setActivate] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>(null);
    const { activateUser, loading } = useAppSelector(state => state.adminPanelReducer);
    const { id, name, surname, email, is_active, last_login } = user;
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
                                ID&#58;&nbsp;<strong>{ id }</strong>
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
                            <Row className='w-25'>
                                <StatisticUser id={ id } />
                            </Row>
                            <Row className='w-25 m-0 d-flex flex-column justify-content-start'>
                                <Button
                                    type='button'
                                    className='h-25 m-1'
                                    variant={ is_active ? 'outline-danger' : 'outline-warning' }
                                    onClick={(event) => is_active === true ? ban(event) : unban(event)}
                                >
                                    { is_active ? 'ban' : 'unban' }
                                </Button>
                                {
                                    is_active
                                        ?
                                        <Button
                                            variant='outline-dark'
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
