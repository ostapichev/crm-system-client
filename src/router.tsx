import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RequiredAuthAdmin, RequiredAuthHome, RequiredAuthLogin } from './hoc';
import { MainLayout } from './layouts';
import { AdminPage, LoginPage, NotFoundPage, OrdersPage, RegisterPage } from './pages';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
    {
        path: 'login', element: 
            <RequiredAuthLogin>
                <LoginPage />
            </RequiredAuthLogin>
    },
    {
        path: 'activate/:token', element:
            <RequiredAuthLogin>
                <RegisterPage page='activateUser' />
            </RequiredAuthLogin>
    },
    {
        path: 'recovery/:token', element:
            <RequiredAuthLogin>
                <RegisterPage page='recoveryPassword' />
            </RequiredAuthLogin>
    },
    {
        path: '', element: <MainLayout />, children: [
            {
                index: true, element: <Navigate to='login' />
            },
            {
                path: 'orders', element:
                    <RequiredAuthHome>
                        <OrdersPage />
                    </RequiredAuthHome>
            },
            {
                path: 'admin', element:
                    <RequiredAuthAdmin>
                        <AdminPage />
                    </RequiredAuthAdmin>
            },
            {
                path: '*', element: <NotFoundPage />
            },
        ]
    },
]);

export default router;
