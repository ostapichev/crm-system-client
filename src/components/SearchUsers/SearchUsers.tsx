import { FC } from 'react';

import { Button, FloatingLabel, Form } from 'react-bootstrap';

const SearchUsers: FC = () => {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <FloatingLabel
                controlId="floatingInput"
                label='Enter the name or the surname'
                className="d-flex flex-nowrap mb-3 w-25"
            >
                <Form.Control type='search' placeholder='name' />
                <Button variant='outline-primary'>
                    Search
                </Button>
            </FloatingLabel>
        </div>
    );
};

export {
    SearchUsers
};
