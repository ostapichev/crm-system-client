import { FC } from 'react';

import { RegisterForm } from '../../components';

interface IProps {
    page: string;
}

const RegisterPage: FC<IProps> = ({ page }) => {
    return (
        <div className='modal show bg-info d-block'>
            <RegisterForm />
        </div>
    );
};

export {
    RegisterPage
};
