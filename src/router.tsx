import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layouts";
import { AdminPage, LoginPage, NotFoundPage, OrdersPage, RegisterPage } from "./pages";

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
    {
        path: 'login', element: <LoginPage />
    },
    {
        path: 'activate/:token', element: <RegisterPage page='activateUser' />
    },
    {
        path: 'recovery/:token', element: <RegisterPage page='recoveryPassword' />
    },
    {
        path: '', element: <MainLayout />, children: [
            {
                index: true, element: <Navigate to='login' />
            },
            {
                path: 'orders', element: <OrdersPage />
            },
            {
                path: 'admin', element: <AdminPage />
            },
            {
                path: '*', element: <NotFoundPage />
            },
        ]
    },
]);

export default router;
