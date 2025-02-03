import { FC } from 'react';

import { Button, FloatingLabel, Form } from 'react-bootstrap';

const SearchUser: FC = () => {
    return (
        <div className='d-flex justify-content-center w-75'>
            <FloatingLabel
                controlId="floatingInput"
                label='Enter the name or the surname'
                className="d-flex flex-nowrap w-25"
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
    SearchUser
};
