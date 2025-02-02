import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IParams } from '../../interfaces';
import { Button, Card } from 'react-bootstrap';
import { IFuncVoid } from '../../types';
import { UserForm } from '../UserForm/UserForm';
import { adminPanelActions } from '../../redux';
import { User } from '../User/User';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.adminPanelReducer);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const handleCloseForm: IFuncVoid = (): void => setOpenForm(false);
    const handleShowForm: IFuncVoid = (): void => setOpenForm(true);
    useEffect(() => {
        const params: IParams = {};
        dispatch(adminPanelActions.getAll({ params }));
    }, [dispatch]);
    
    return (
        <div>
            <Card
                bg='Light'
                text='dark'
                className='m-5 w-full'
            >
                <Card.Header className='d-flex flex-wrap justify-content-between'>
                    <div className='display-6'>Users</div>
                    <Button
                        onClick={ handleShowForm }    
                        variant='outline-secondary'
                    >
                        Create User
                    </Button>
                </Card.Header>
                <Card.Body className='d-flex flex-wrap justify-content-between'>
                    {
                        users.map(user => 
                            <User 
                                key={ user.id } 
                                user={ user } 
                            />)
                    }
                </Card.Body>
            </Card>
            <UserForm openForm={ openForm } closeForm={ handleCloseForm } />
        </div>
    );
};

export {
    Users
};
