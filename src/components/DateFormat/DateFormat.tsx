import { FC, Fragment } from 'react';
import dayjs from 'dayjs';

interface IProps {
    originalDate?: string;
}

const DateFormat: FC<IProps> = ({ originalDate }) => {
    const formatedData = originalDate ? dayjs(originalDate).format('MMMM DD, YYYY').toString() : 'no data';

    return (
        <Fragment>{ formatedData }</Fragment>
    );
};

export {
    DateFormat
};
