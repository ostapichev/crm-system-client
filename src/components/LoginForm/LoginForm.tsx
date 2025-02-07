import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Alert, Button, FloatingLabel, Form, Image, Modal } from 'react-bootstrap';

import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAuth } from '../../interfaces';
import { authActions } from '../../redux';
import { authService } from '../../services';
import { authValidator } from '../../validators';

import { okten_school_image } from '../../assets';

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { errorAuth, loading } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, reset, formState: { errors, dirtyFields, isValid } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator),
    });
    const login: SubmitHandler<IAuth> = async (user: IAuth): Promise<void> => {
        if (localStorage.length > 0) authService.clearDataStorage();
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
                        { errors.email && <FormControlFeedbackError error={ errors.email.message } /> }
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Password'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            disabled={ loading }
                            isInvalid={ !!errors.password }
                            { ...register('password') }
                        />
                        { errors.password && <FormControlFeedbackError error={ errors.password.message } />}
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue' }}>
                    {
                        errorAuth?.messages &&
                        <Alert className='p-2' variant='danger'>{ errorAuth?.messages }</Alert>
                    }
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
