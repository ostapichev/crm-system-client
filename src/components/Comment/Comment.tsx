import {FC, Fragment} from 'react';

import { IComment } from '../../interfaces';
import { DateFormat } from '../DateFormat/DateFormat';

interface IProps {
    comment: IComment;
}

const Comment: FC<IProps> = ({ comment }) => {
    const { text, user, created_at } = comment;

    return (
        <div>
            <Fragment>
                <div className='d-flex flex-column border-bottom border-info'>
                    <i>{ user.name } { user.surname }, { <DateFormat originalDate={created_at}/> }</i>
                    <i><strong>{text}</strong></i>
                </div>
            </Fragment>
        </div>
    );
};

export {
    Comment
};
