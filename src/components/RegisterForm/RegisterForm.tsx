import { FC } from 'react';

import { Button, Form, Image, Modal } from "react-bootstrap";

import { okten_school } from "../../assets";

const RegisterForm: FC = () => {
    return (
        <div
            className="modal show"
            style={{ display: 'block', backgroundColor: 'indigo' }}
        >
            <Modal.Dialog centered>
                <Form>
                    <Modal.Header style={{ backgroundColor: 'aliceblue' }}>
                        <Modal.Title>
                            <Image src={ okten_school } className='w-50' alt='okten-school'/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'azure' }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: 'aliceblue' }}>
                        <Button variant="primary" type="submit">
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
