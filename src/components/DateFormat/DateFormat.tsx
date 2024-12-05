import { FC, Fragment } from 'react';
import { format } from 'date-fns';

interface IProps {
    originalDate: string;
}

const DateFormat: FC<IProps> = ({ originalDate }) => {
    const formatedData = format(new Date(originalDate ? originalDate : 'No data'), 'MMMM dd, yyyy');

    return (
        <Fragment>{ formatedData }</Fragment>
    );
};

export {
    DateFormat
};
