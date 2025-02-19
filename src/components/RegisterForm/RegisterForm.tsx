import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Alert, Button, FloatingLabel, Form, Image, Modal }  from 'react-bootstrap';

import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAuth, IFeedback } from '../../interfaces';
import { authActions } from '../../redux';
import { passwordValidator } from '../../validators/password.validator';

import { okten_school_image } from '../../assets';

const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<IFeedback>(null);
    const { loading, errorAuth } = useAppSelector(state => state.authReducer);
    const { activateToken } = useParams<{ activateToken: string }>();
    const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm<IAuth>({
        mode: 'all',
        resolver: joiResolver(passwordValidator),
    });
    const recoveryActivateRequestUser: SubmitHandler<IAuth> = async (): Promise<void> => {
        const { password, confirmPassword } = getValues();
        if (password !== confirmPassword) {
            setErrorMessage({ message: 'Password mismatch!' });
            return;
        }
        const formData = new FormData();
        formData.append('password', password);
        const { meta: { requestStatus } } = await dispatch(authActions.activateRequestUser(
            { formData, activateToken }
        ));
        if (requestStatus === 'fulfilled') {
            setErrorMessage(null);
            navigate('/login');
        }
        reset();
    };

    return (
        <Modal.Dialog centered>
            <Form onSubmit={ handleSubmit(recoveryActivateRequestUser) }>
                <Modal.Header className='bg-info-subtle'>
                    <Modal.Title>
                        <Image src= { okten_school_image } className='w-25' alt='okten-school' />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'aliceblue'}}>
                    <FloatingLabel controlId='floatingPassword' label='Password' className='mb-3'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            disabled={ loading }
                            isInvalid={ !!errors.password }
                            { ...register('password', { required: true }) }
                        />
                        { errors.password && <FormControlFeedbackError error={ errors.password.message } /> }
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Confirm password'>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            disabled={ loading }
                            isInvalid={ !!errors.confirmPassword }
                            { ...register('confirmPassword', { required: true }) }
                        />
                        { errors.confirmPassword && <FormControlFeedbackError error={ errors.confirmPassword.message } /> }
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue' }}>
                    {
                        errorAuth?.messages &&
                        <Alert className='p-2' variant='danger'>{ errorAuth?.messages }</Alert>
                    }
                    {
                        errorMessage &&
                        <Alert className='p-2' variant='danger'>{ errorMessage?.message }</Alert>
                    }
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={ loading }
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>
    );
};

export {
    RegisterForm
};
