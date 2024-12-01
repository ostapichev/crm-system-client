import { FC } from 'react';

import { RegisterForm } from "../../components";

interface IProps {
    page: string;
}

const RegisterPage: FC<IProps> = ({ page }) => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export {
    RegisterPage
};
