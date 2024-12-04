import { FC, Fragment, useEffect, useState } from 'react';

import { Badge, Button, Container, Image, Navbar, Stack } from 'react-bootstrap';

import { UserRoleEnum } from '../../enums';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { authService } from '../../services';
import { NavLink } from 'react-router-dom';
import { authActions } from '../../redux';

import { okten_school_image } from '../../assets';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const [hoverLogin, setHoverLogin] = useState<boolean>(false);
    const [hoverAdmin, setHoverAdmin] = useState<boolean>(false);
    const [hoverHome, setHoverHome] = useState<boolean>(false);
    const { me } = useAppSelector(state => state.authReducer);
    const logout = () => {
        dispatch(authActions.logout());
        dispatch(authActions.resetLoading());
    };
    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me());
        }
    }, [dispatch, me]);

    return (
        <Navbar className='bg-info-subtle'>
            <Container fluid>
                <Navbar.Brand href='https://owu.com.ua' target='_blank'>
                    <Image src={ okten_school_image } className='w-50' alt='okten-school' />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        {
                            me ?
                                <Stack direction='horizontal' gap={2}>
                                    <h1><Badge bg='info'>{ me.surname }</Badge></h1>
                                    {
                                        me.role === UserRoleEnum.ADMIN &&
                                        <Fragment>
                                            <Button
                                                variant='light'
                                                className='m-2'
                                                onMouseEnter={ () => setHoverAdmin(true) }
                                                onMouseLeave={ () => setHoverAdmin(false) }
                                            >
                                                <NavLink to='admin'>
                                                    {
                                                        hoverAdmin
                                                            ? <i className='bi bi-person-gear fs-3'></i>
                                                            : <i className='bi bi-person-fill-gear fs-3'></i>
                                                    }
                                                </NavLink>
                                            </Button>
                                            <Button
                                                variant='light'
                                                className='m-2'
                                                onMouseEnter={ () => setHoverHome(true) }
                                                onMouseLeave={ () => setHoverHome(false) }
                                            >
                                                <NavLink to='orders'>
                                                    {
                                                        hoverHome
                                                            ? <i className='bi bi-house-door fs-3'></i>
                                                            : <i className='bi bi-house-door-fill fs-3'></i>
                                                    }
                                                </NavLink>
                                            </Button>
                                        </Fragment>
                                    }
                                    <Button
                                        variant='light'
                                        className='m-2'
                                        onClick={ logout }
                                        onMouseEnter={ () => setHoverLogin(true) }
                                        onMouseLeave={ () => setHoverLogin(false) }
                                    >
                                        <NavLink to='login'>
                                        {
                                            hoverLogin
                                                ? <i className='bi bi-door-closed-fill fs-3'></i>
                                                : <i className='bi bi-door-open-fill fs-3'></i>
                                        }
                                        </NavLink>
                                    </Button>
                                </Stack>
                                :
                                <Button
                                    variant='light'
                                    className='m-2'
                                    onMouseEnter={ () => setHoverLogin(true) }
                                    onMouseLeave={ () => setHoverLogin(false) }
                                >
                                    <NavLink to='login'>
                                        {
                                            hoverLogin
                                                ? <i className='bi bi-door-open-fill fs-3'></i>
                                                : <i className='bi bi-door-closed-fill fs-3'></i>
                                        }
                                    </NavLink>
                                </Button>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export {
    Header
};
