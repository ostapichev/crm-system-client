import React, { FC } from 'react';

import { Placeholder } from 'react-bootstrap';

import { xsValues } from '../../constants';

interface IProps {
    xss: number[];
}

const OrderPlaceholder: FC<IProps> = ({ xss = new Array(xsValues.length) }) => (
    <tr>
        {
            xss.map((xs: number, index: number) => (
                <td key={ index }>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={ xs } />
                    </Placeholder>
                </td>
            ))
        }
    </tr>
);

export {
    OrderPlaceholder
};
