import { FC } from 'react';

import { Button, Card, Row } from 'react-bootstrap';

import { DateFormat } from "../DateFormat/DateFormat";
import { IUser } from '../../interfaces';

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const { id, name, surname, email, is_active, last_login } = user;
    
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
                    <Card.Text className='mb-0'>total: <strong>20</strong></Card.Text>
                    <Card.Text className='mb-0'>in work: <strong>21</strong></Card.Text>
                    <Card.Text className='mb-0'>agree: <strong>22</strong></Card.Text>
                    <Card.Text className='mb-0'>disagree: <strong>11</strong></Card.Text>
                    <Card.Text className='mb-0'>dubbing: <strong>5</strong></Card.Text>
                </Row>
                <Row className='w-25'>
                    <Row className='p-2'>
                        <Button variant='outline-danger'>Ban</Button>
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
