import {FC, MouseEventHandler, useState} from 'react';

import { Alert, Button, Card, Row } from 'react-bootstrap';

import { urls } from "../../constants";
import { DateFormat } from "../DateFormat/DateFormat";
import { IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminPanelActions } from "../../redux";

interface IProps {
    user: IUser;
    statistic: (value: number) => void;
}

const User: FC<IProps> = ({ user, statistic }) => {
    const dispatch = useAppDispatch();
    const [activate, setActivate] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>(null);
    const { userStatistic, activateUser } = useAppSelector(state => state.adminPanelReducer);
    const { id, name, surname, email, is_active, last_login } = user;
    const { orders, agree, disagree, in_work, dubbing } = userStatistic;
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
            <Card.Header>ID: { id }</Card.Header>
            <Card.Body className='d-flex'>
                <Row style={{ width: '40%'}} className='m-0'>
                    <Card.Text className='mb-1'>name:&nbsp;<strong>{ name }</strong></Card.Text>
                    <Card.Text className='mb-1'>surname:&nbsp;<strong>{ surname }</strong></Card.Text>
                    <Card.Text className='mb-1'>email:&nbsp;<strong>{ email }</strong></Card.Text>
                    <Card.Text className='mb-1'>is&nbsp;active:&nbsp;<strong>{ is_active.toString() }</strong></Card.Text>
                    <Card.Text className='mb-1'>last&nbsp;login:&nbsp;
                        <strong>{ last_login ? <DateFormat originalDate={ last_login } /> : 'no data' }</strong>
                    </Card.Text>
                </Row>
                <Row className='w-25'>
                    <Card.Text className='m-1'>total: <strong>{ orders }</strong></Card.Text>
                    <Card.Text className='m-1'>in work: <strong>{ in_work }</strong></Card.Text>
                    <Card.Text className='m-1'>agree: <strong>{ agree }</strong></Card.Text>
                    <Card.Text className='m-1'>disagree: <strong>{ disagree }</strong></Card.Text>
                    <Card.Text className='m-1'>dubbing: <strong>{ dubbing }</strong></Card.Text>
                </Row>
                <Row className='w-25 d-flex flex-column justify-content-start'>
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
        </Card>
    );
};

export {
    User
};
