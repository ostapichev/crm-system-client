import { FC } from 'react';

import { Badge } from "react-bootstrap";

const NotContent: FC = () => {
    return (
        <div
            className='vh-100 bg-info d-flex flex-column align-items-center justify-content-start'
            style={{ color: 'snow' }}
        >
            <h1
                className='header display-1 mt-5'
                style={{ fontFamily: 'serif', fontSize: '15em' }}
            >
                404
            </h1>
            <p
                className='fs-1'
                style={{ fontFamily: 'Helvetica serif' }}
            >
                <Badge bg='danger'>Not found content</Badge>
            </p>
        </div>
    );
};

export {
    NotContent
};
