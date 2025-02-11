import { FC, Fragment } from 'react';
import dayjs from 'dayjs';

import { dataInsert } from '../../utils';

interface IProps {
    originalDate: string;
}

const DateFormat: FC<IProps> = ({ originalDate }) => {
    const formatedData = dayjs(dataInsert(originalDate)).format('MMMM DD, YYYY').toString();

    return (
        <Fragment>{ formatedData }</Fragment>
    );
};

export {
    DateFormat
};
