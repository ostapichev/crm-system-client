import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Alert, Button, Container, FloatingLabel, Form, Image, Modal } from 'react-bootstrap';

import { FormControlFeedbackError } from '../FormControlFeedbackError/FormControlFeedbackError';
import { FormControlFeedbackGood } from '../FormControlFeedbackGood/FormControlFeedbackGood';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUser } from '../../interfaces';
import { adminPanelActions } from '../../redux';
import { IFuncVoid } from '../../types';
import { userValidator } from '../../validators';

import { okten_school_image } from '../../assets';

interface IProps {
    openForm: boolean;
    setOpenForm: (value: boolean) => void;
}

const UserForm: FC<IProps> = ({ openForm, setOpenForm }) => {
    const dispatch = useAppDispatch();
    const { errorUser } = useAppSelector(state => state.adminPanelReducer);
    const { handleSubmit, register, reset, formState: { isValid, errors, touchedFields } } = useForm<IUser>({
        mode: 'all',
        resolver: joiResolver(userValidator),
    });
    const closeForm: IFuncVoid = (): void => {
        dispatch(adminPanelActions.setDefault());
        setOpenForm(false);
        reset();
    };
    const save: SubmitHandler<IUser> = async (user: IUser) => {
        await dispatch(adminPanelActions.create({ user }));
        reset();
    };

    return (
        <Modal
            show={ openForm }
            onHide={ closeForm }
            backdrop='static'
            keyboard={ false }
            centered
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={ handleSubmit(save) }>
                <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                    <Container className='mt-4'>
                        <FloatingLabel
                            controlId='floatingInputGrid'
                            label='Name'
                        >
                            <Form.Control
                                type='text'
                                placeholder='name'
                                isInvalid={ !!errors.name }
                                isValid={ touchedFields.name && !errors.name }
                                { ...register('name') }
                            />
                            { errors.name && <FormControlFeedbackError error={ errors.name.message } /> }
                            { !errors.name && <FormControlFeedbackGood /> }
                        </FloatingLabel>
                    </Container>
                    <Container className='mt-4'>
                        <FloatingLabel
                            controlId='floatingInputGrid'
                            label='Surname'
                        >
                            <Form.Control
                                type='text'
                                placeholder='surname'
                                isInvalid={ !!errors.surname }
                                isValid={ touchedFields.surname && !errors.surname }
                                { ...register('surname') }
                            />
                            { errors.surname && <FormControlFeedbackError error={ errors.surname.message } /> }
                            { !errors.surname && <FormControlFeedbackGood /> }
                        </FloatingLabel>
                    </Container>
                    <Container className='mt-4'>
                        <FloatingLabel
                            controlId='floatingInputGrid'
                            label='Email'
                        >
                            <Form.Control
                                type='email'
                                placeholder='email'
                                isInvalid={ !!errors.email }
                                isValid={ touchedFields.email && !errors.email }
                                { ...register('email') }
                            />
                            { errors.email && <FormControlFeedbackError error={ errors.email.message } /> }
                            { !errors.email && <FormControlFeedbackGood /> }
                        </FloatingLabel>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue'}}>
                    {
                        errorUser?.messages &&
                        <Alert className='p-2' key='danger' variant='danger'>{ errorUser?.messages }</Alert>
                    }
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={ closeForm }
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={ !isValid }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export {
    UserForm
};
