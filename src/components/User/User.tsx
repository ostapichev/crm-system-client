import { FC, MouseEventHandler } from 'react';

import { Button, Card, Row } from 'react-bootstrap';

import { DateFormat } from "../DateFormat/DateFormat";
import { IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminPanelActions } from "../../redux";

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const { userStatistic } = useAppSelector(state => state.adminPanelReducer);
    const { id, name, surname, email, is_active, last_login } = user;
    const { orders, agree, disagree, in_work, dubbing } = userStatistic;
    const ban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminPanelActions.ban({ id }));
    };
    const unban: MouseEventHandler<HTMLButtonElement> = async () => {
        await dispatch(adminPanelActions.unban({ id }));
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
                <Row style={{ width: '40%'}}>
                    <Card.Text className='mb-0'>name: <strong>{ name }</strong></Card.Text>
                    <Card.Text className='mb-0'>surname: <strong>{ surname }</strong></Card.Text>
                    <Card.Text className='mb-0'>email: <strong>{ email }</strong></Card.Text>
                    <Card.Text className='mb-0'>is active: <strong>{ is_active.toString() }</strong></Card.Text>
                    <Card.Text className='mb-0'>last login:
                        <strong>{ last_login ? <DateFormat originalDate={ last_login } /> : ' no data' }</strong>
                    </Card.Text>
                </Row>
                <Row className='w-25'>
                    <Card.Text className='mb-0'>total: <strong>{ orders }</strong></Card.Text>
                    <Card.Text className='mb-0'>in work: <strong>{ in_work }</strong></Card.Text>
                    <Card.Text className='mb-0'>agree: <strong>{ agree }</strong></Card.Text>
                    <Card.Text className='mb-0'>disagree: <strong>{ disagree }</strong></Card.Text>
                    <Card.Text className='mb-0'>dubbing: <strong>{ dubbing }</strong></Card.Text>
                </Row>
                <Row className='w-25'>
                    <Row className='p-2'>
                        <Button
                            type='button'
                            variant={ is_active ? 'outline-danger' : 'outline-warning' }
                            onClick={(event) => is_active === true ? ban(event) : unban(event)}
                        >
                            { is_active ? 'ban' : 'unban' }
                        </Button>
                    </Row>
                    <Row className='p-2'>
                        <Button variant='outline-success'>Activate</Button>
                    </Row>
                </Row>
            </Card.Body>
        </Card>
    );
};

export {
    User
};
