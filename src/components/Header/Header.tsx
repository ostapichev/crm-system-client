import { FC } from 'react';

import {Container, Image, Navbar} from "react-bootstrap";

import { okten_school } from "../../assets";

const Header: FC = () => {
    return (
        <Navbar className="bg-dark-subtle">
            <Container fluid>
                <Navbar.Brand href="https://owu.com.ua" target='_blank'>
                    <Image src={ okten_school } className='w-50' alt='okten-school' />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export {
    Header
};
