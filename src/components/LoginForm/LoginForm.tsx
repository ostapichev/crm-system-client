import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Alert, Button, FloatingLabel, Form, Image, Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAuth } from '../../interfaces';
import { authActions } from '../../redux';
import { authService } from '../../services';
import { authValidator } from '../../validators';

import { okten_school_image } from '../../assets';

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, reset, formState: { errors, dirtyFields, isValid } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator),
    });
    const login: SubmitHandler<IAuth> = async (user) => {
        if (localStorage.getItem('accessToken' || 'refreshToken')) authService.deleteTokens();
        const { meta: { requestStatus } } = await dispatch(authActions.login(user));
        if (requestStatus === 'fulfilled') navigate('/orders');
        reset();
    };
    useEffect(() => {
        if (!dirtyFields.email || !dirtyFields.password) {
            dispatch(authActions.resetLoading());
        }
    }, [dispatch, dirtyFields]);

    return (
        <Modal.Dialog centered>
            <Form onSubmit={ handleSubmit(login) }>
                <Modal.Header className='bg-info-subtle'>
                    <Modal.Title>
                        <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                    <FloatingLabel
                        controlId='floatingInput'
                        label='Email'
                        className='mb-3'
                    >
                        <Form.Control 
                            type='email' 
                            placeholder='name@example.com'
                            disabled={ loading }
                            isInvalid={ !!errors.email }
                            { ...register('email') }
                        />
                        {
                            errors.email &&
                            <Form.Control.Feedback type='invalid' tooltip>
                                { errors.email.message }
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Password'>
                        <Form.Control 
                            type='password' 
                            placeholder='Password'
                            disabled={ loading }
                            isInvalid={ !!errors.password }
                            { ...register('password') }
                        />
                        {
                            errors.password &&
                            <Form.Control.Feedback type='invalid' tooltip>
                                { errors.password.message }
                            </Form.Control.Feedback>
                        }
                    </FloatingLabel>
                    {
                        error?.messages &&
                        <Alert key='danger' variant='danger' className='mt-3'>
                            { error?.messages }
                        </Alert>
                    }
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                    <Button variant='primary' type='submit' disabled={ !isValid || loading }>
                        { loading ? 'loading...' : 'login' }
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    );
};

export {
    LoginForm
};
