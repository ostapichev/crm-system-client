import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { Button, Card } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IParams } from '../../interfaces';
import { adminPanelActions } from '../../redux';
import { IFuncVoid } from '../../types';
import { User } from '../User/User';
import { UserForm } from '../UserForm/UserForm';

const Users: FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.adminPanelReducer);
    const [query] = useSearchParams();
    const [openForm, setOpenForm] = useState<boolean>(false);
    const handleCloseForm: IFuncVoid = (): void => setOpenForm(false);
    const handleShowForm: IFuncVoid = (): void => setOpenForm(true);
    const [debouncedParams] = useDebounce<IParams>(
        {
            page: query.get('page'),
        }, 500);
    const debouncedParamsString = JSON.stringify(debouncedParams);
    useEffect(() => {
        dispatch(adminPanelActions.setPage(+query.get('page')));
    }, [dispatch, query]);
    useEffect(() => {
        const params: IParams = JSON.parse(debouncedParamsString);
        dispatch(adminPanelActions.getAll({ params }));
    }, [dispatch, debouncedParamsString]);
    
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
