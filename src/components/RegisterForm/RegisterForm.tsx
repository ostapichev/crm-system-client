import { FC } from 'react';

import { Button, Form, Image, Modal } from 'react-bootstrap';

import { okten_school_image } from '../../assets';

const RegisterForm: FC = () => {
    return (
        <div className='modal show bg-primary-subtle d-block'>
            <Modal.Dialog centered>
                <Form>
                    <Modal.Header className='bg-info'>
                        <Modal.Title>
                            <Image src={okten_school_image} className='w-25' alt='okten-school' />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'aliceblue'}}>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{backgroundColor: 'aliceblue'}}>
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Dialog>
        </div>
    );
};

export {
    RegisterForm
};
