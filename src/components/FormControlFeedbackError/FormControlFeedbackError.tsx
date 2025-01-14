import { FC } from 'react';

import { Form } from 'react-bootstrap';

interface IProps {
    error?: string[] | string;
}

const FormControlFeedbackError: FC<IProps> = ({ error }) => {
    return (
        <Form.Control.Feedback type="invalid" tooltip>
            { error }
        </Form.Control.Feedback>
    );
};

export {
    FormControlFeedbackError
};
