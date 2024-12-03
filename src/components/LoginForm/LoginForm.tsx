import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";

import { Alert, Button, Form, Image, Modal } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IAuth } from "../../interfaces";
import { authActions } from "../../redux";
import { authService } from "../../services";
import { authValidator } from "../../validators";

import { okten_school } from "../../assets";

const LoginForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector(state => state.authReducer);
    const { handleSubmit, register, reset, formState: { errors, dirtyFields, isValid }} = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(authValidator)
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
        <div
            className="modal show"
            style={{ display: 'block', backgroundColor: 'indigo' }}
        >
            <Modal.Dialog centered>
                <Form onSubmit={ handleSubmit(login) }>
                <Modal.Header style={{ backgroundColor: 'aliceblue'}}>
                    <Modal.Title>
                        <Image src={ okten_school } className='w-50' alt='okten-school' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'azure'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            disabled={ loading }
                            { ...register('email', { required: true }) }
                        />
                        {
                            errors.email &&
                            <Alert key='danger' variant='danger' className='mt-3'>
                                { errors.email.message }
                            </Alert>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            disabled={ loading }
                            { ...register('password', { required: true }) }
                        />
                        {
                            errors.password &&
                            <Alert key='danger' variant='danger' className='mt-3'>
                                { errors.password.message }
                            </Alert>
                        }
                    </Form.Group>
                    {
                        error?.messages &&
                        <Alert key='danger' variant='danger' className='mt-3'>
                            { error?.messages }
                        </Alert>
                    }
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                    <Button variant="primary" type="submit" disabled={ !isValid }>
                        { loading ? 'loading...' : 'login' }
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal.Dialog>
        </div>
    );
};

export {
    LoginForm
};
