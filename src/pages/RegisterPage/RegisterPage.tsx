import { FC } from 'react';

import { RegisterForm } from '../../components';

const RegisterPage: FC = () => {
    return (
        <div className='modal show bg-info d-block'>
            <RegisterForm />
        </div>
    );
};

export {
    RegisterPage
};
