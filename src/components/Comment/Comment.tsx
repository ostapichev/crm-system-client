import { FC } from 'react';

import { IComment } from '../../interfaces';
import { DateFormat } from '../DateFormat/DateFormat';

interface IProps {
    comment: IComment;
    isOpen: boolean;
}

const Comment: FC<IProps> = ({ comment, isOpen }) => {
    const { text, user, created_at } = comment;
    const getTextFormat = (text: string): string => {
        if (text.length > 100 && !isOpen) {
            return text.slice(0, 100) + '...';
        }
        return text;
    };

    return (
        <div className='d-flex flex-column border-bottom border-info'>
            <i>{ user.name }&nbsp;{ user.surname },&nbsp;{ <DateFormat originalDate={ created_at } /> }</i>
            <i>
                <strong>{ getTextFormat(text) }</strong>
            </i>
        </div>
    );
};

export {
    Comment
};
