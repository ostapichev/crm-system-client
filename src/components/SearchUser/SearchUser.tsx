import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { ISearchUser } from '../../interfaces';
import { searchValidator } from '../../validators';

const SearchUser: FC = () => {
    const [query, setQuery] = useSearchParams();
    const { register, reset, handleSubmit, formState: { isValid } } = useForm<ISearchUser>({
        mode: 'all',
        resolver: joiResolver(searchValidator),
    });
    const searchUser: SubmitHandler<ISearchUser> = (data: ISearchUser): void => {
        query.set('page', '1');
        query.set('search', data.search);
        setQuery(query);
        reset();
    };

    return (
        <Form
            onSubmit={ handleSubmit(searchUser) }
            className='d-flex flex-row justify-content-center w-75'
        >
            <FloatingLabel
                controlId='floatingInput'
                label='Enter the name or the surname'
                className='d-flex flex-row w-25'
            >
                <Form.Control
                    type='search'
                    placeholder='name'
                    { ...register('search') }
                />
                <Button
                    type='submit'
                    variant='outline-primary'
                    disabled={ !isValid }
                >
                    Search
                </Button>
            </FloatingLabel>
        </Form>
    );
};

export {
    SearchUser
};
