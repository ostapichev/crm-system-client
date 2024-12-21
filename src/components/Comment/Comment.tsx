import {FC, Fragment} from 'react';

import { IComment } from '../../interfaces';
import { DateFormat } from '../DateFormat/DateFormat';

interface IProps {
    comment: IComment;
}

const Comment: FC<IProps> = ({ comment }) => {
    const { text, user, created_at } = comment;

    return (
        <Fragment>
            <Fragment>{ text }</Fragment>
            <Fragment>{ user.surname }</Fragment>
            <Fragment>{ <DateFormat originalDate={ created_at } />}</Fragment>
        </Fragment>
    );
};

export {
    Comment
};
