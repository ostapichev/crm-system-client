import { FC, Fragment, useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

import { IFuncVoid } from "../../types";

const LoginForm: FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose: IFuncVoid = () => setShow(false);
    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <Fragment>
            <Modal
                show={ show }
                onHide={ handleClose }
                centered
            >
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export {
    LoginForm
};
