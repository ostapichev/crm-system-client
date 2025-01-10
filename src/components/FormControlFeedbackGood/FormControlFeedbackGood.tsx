import { FC } from 'react';

import { Form } from 'react-bootstrap';

const FormControlFeedbackGood: FC = () => {
    return (
        <Form.Control.Feedback tooltip>
            Looks&nbsp;good!
        </Form.Control.Feedback>
    );
};

export {
    FormControlFeedbackGood
};
