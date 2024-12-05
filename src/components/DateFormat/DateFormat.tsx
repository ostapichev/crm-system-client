import { FC, Fragment } from 'react';
import { format } from 'date-fns';

import { dataInsert } from '../../utils';

interface IProps {
    originalDate: string;
}

const DateFormat: FC<IProps> = ({ originalDate }) => {
    const formatedData = format(new Date(dataInsert(originalDate)), 'MMMM dd, yyyy');

    return (
        <Fragment>{ formatedData }</Fragment>
    );
};

export {
    DateFormat
};
