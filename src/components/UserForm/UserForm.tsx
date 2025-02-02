import { FC } from 'react';

import {Alert, Button, Container, FloatingLabel, Form, Image, Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IFuncVoid } from '../../types';

import { okten_school_image } from '../../assets';

interface IProps {
    closeForm: IFuncVoid;
    openForm: boolean;
}

const UserForm: FC<IProps> = ({ openForm, closeForm }) => {
    const dispatch = useAppDispatch();
    const { errorUser } = useAppSelector(state => state.adminPanelReducer);

    return (
        <Modal
            size='lg'
            show={ openForm }
            onHide={ closeForm }
            backdrop='static'
        >
            <Modal.Header className='bg-info-subtle' closeButton>
                <Modal.Title>
                    <Image src={ okten_school_image } className='w-25' alt='okten-school' />
                </Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body style={{ backgroundColor: 'aliceblue' }}>
                    <Container className='mt-4'>
                                <FloatingLabel
                                    controlId='floatingInputGrid'
                                    label='Name'
                                >
                                    <Form.Control
                                        type='text'
                                        placeholder='name'
                                    
                                    />
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
                                    />
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
                                    />
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
                    >
                        Create user
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export {
    UserForm
};
