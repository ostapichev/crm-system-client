import { FC } from 'react';

import { LoginForm } from '../../components';

const LoginPage: FC = () => {
    return (
        <div className='modal show bg-info d-block'>
            <LoginForm />
        </div>
    );
};

export {
    LoginPage
};
