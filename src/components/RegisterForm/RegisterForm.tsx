import { FC } from 'react';

import { Button, FloatingLabel, Form, Image, Modal } from 'react-bootstrap';

import { okten_school_image } from '../../assets';

const RegisterForm: FC = () => {
    return (
        <Modal.Dialog centered>
            <Form>
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
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId='floatingPassword' label='Confirm password'>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'aliceblue' }}>
                    <Button variant='primary' type='submit'>
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
