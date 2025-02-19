import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button, Container, DropdownButton, Image, Navbar, Stack } from 'react-bootstrap';

import { oktenURL } from '../../constants';
import { UserRoleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Profile } from '../Profile/Profile';
import { adminPanelActions, authActions, groupActions, orderActions } from '../../redux';
import { authService, orderService } from '../../services';
import { IFuncVoid } from '../../types';

import { okten_logo } from '../../assets';
import css from './Header.module.css';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [hoverLogin, setHoverLogin] = useState<boolean>(false);
    const [hoverAdmin, setHoverAdmin] = useState<boolean>(false);
    const [hoverHome, setHoverHome] = useState<boolean>(false);
    const { me } = useAppSelector(state => state.authReducer);
    const { groupTrigger } = useAppSelector(state => state.groupReducer);
    const logout: IFuncVoid = useCallback( async (): Promise<void> => {
        const { meta: { requestStatus } } = await dispatch(authActions.logout());
        if (requestStatus === 'fulfilled') navigate('/login');
        dispatch(adminPanelActions.setDefault());
        dispatch(orderActions.setDefault());
        dispatch(orderActions.setOrdersDefault());
        dispatch(authActions.resetLoading());
    }, [dispatch, navigate]);
    const resetParamsOrders: IFuncVoid = (): void => {
        dispatch(orderActions.setDefault());
        orderService.removeCheckBoxLocalData();
    };
    useEffect(() => {
        if (!me && authService.getAccessToken()) {
            dispatch(authActions.me());
        }
    }, [dispatch, me]);
    useEffect(() => {
        dispatch(groupActions.getAll());
    }, [dispatch, groupTrigger]);
    useEffect(() => {
        let timeoutId: NodeJS.Timeout = null;
        const handleMove: IFuncVoid = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                logout();
                navigate('/login');
            }, 900000);
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('keydown', handleMove)
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('keydown', handleMove);
            clearTimeout(timeoutId);
        };
    }, [logout, navigate]);

    return (
        <Navbar className='bg-info-subtle' fixed='top' sticky='top'>
            <Container fluid>
                <Navbar.Brand href={ oktenURL } target='_blank'>
                    <Image src={ okten_logo } className={ css.Logo } alt='okten-school' />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        {
                            me
                                ?
                                <Stack direction='horizontal' gap={2}>
                                    <DropdownButton
                                        size='lg'
                                        variant='light'
                                        id='dropdown-item-button'
                                        title={ me.surname }
                                        align='end' flip={ true }
                                    >
                                        <Profile me={ me } />
                                    </DropdownButton>
                                    {
                                        me.role === UserRoleEnum.ADMIN &&
                                        <Fragment>
                                            <NavLink to='admin'>
                                                <Button
                                                    variant='light'
                                                    className='m-2'
                                                    onMouseEnter={ () => setHoverAdmin(true) }
                                                    onMouseLeave={ () => setHoverAdmin(false) }
                                                >
                                                    {
                                                        hoverAdmin
                                                            ?
                                                            <i className='bi bi-person-gear fs-3'></i>
                                                            :
                                                            <i className='bi bi-person-fill-gear fs-3'></i>
                                                    }
                                                </Button>
                                            </NavLink>
                                            <NavLink to='orders'>
                                                <Button
                                                    variant='light'
                                                    className='m-2'
                                                    onClick={ resetParamsOrders }
                                                    onMouseEnter={ (): void => setHoverHome(true) }
                                                    onMouseLeave={ (): void => setHoverHome(false) }
                                                >

                                                    {
                                                        hoverHome
                                                            ?
                                                            <i className='bi bi-house-door fs-3'></i>
                                                            :
                                                            <i className='bi bi-house-door-fill fs-3'></i>
                                                    }
                                                </Button>
                                            </NavLink>
                                        </Fragment>
                                    }
                                    <Button
                                        variant='light'
                                        className='m-2'
                                        onClick={ logout }
                                        onMouseEnter={ () => setHoverLogin(true) }
                                        onMouseLeave={ () => setHoverLogin(false) }
                                    >
                                        {
                                            hoverLogin
                                                ?
                                                <i className='bi bi-door-closed-fill fs-3'></i>
                                                :
                                                <i className='bi bi-door-open-fill fs-3'></i>
                                        }
                                    </Button>
                                </Stack>
                                :
                                <NavLink to='login'>
                                    <Button
                                        variant='light'
                                        className='m-2'
                                        onMouseEnter={ () => setHoverLogin(true) }
                                        onMouseLeave={ () => setHoverLogin(false) }
                                    >
                                        {
                                            hoverLogin
                                                ?
                                                <i className='bi bi-door-open-fill fs-3'></i>
                                                :
                                                <i className='bi bi-door-closed-fill fs-3'></i>
                                        }
                                    </Button>
                                </NavLink>
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
