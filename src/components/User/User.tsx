import { FC } from 'react';

import { Card } from 'react-bootstrap';

import { IUser } from '../../interfaces';

interface IProps {
    user: IUser;
}

const User: FC<IProps> = ({ user }) => {
    const { id, name, surname, email, is_active } = user;
    
    return (
            <Card
                bg='light'
                text='dark'
                className='m-2'
                style={{ width: '49%' }}
            >
                <Card.Header>ID: { id }</Card.Header>
                <Card.Body>
                    <Card.Text className='mb-0'>name: { name }</Card.Text>
                    <Card.Text className='mb-0'>surname: { surname }</Card.Text>
                    <Card.Text className='mb-0'>email: { email }</Card.Text>
                    <Card.Text className='mb-0'>is active: { is_active.toString() }</Card.Text>
                </Card.Body>
            </Card>
    );
};

export {
    User
};
