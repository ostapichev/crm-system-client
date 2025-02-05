import { FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from "../../hooks";
import { IPagination } from '../../interfaces';
import { PaginationApp } from "../PaginationApp/PaginationApp";
import { IFuncNumber, IFuncValueString } from '../../types';
import { Users } from "../Users/Users";

const UsersPanel: FC = () => {
    const [, setQuery] = useSearchParams();
    const { pageUsers, totalUsersPages, usersLimit, totalUsers } = useAppSelector(state => state.adminPanelReducer);
    const pageChanger: IFuncValueString = useCallback((value: string): void => {
        setQuery(prev => {
            const newPage: number = value === '&raquo;' || value === ' ...'
                ?
                totalUsersPages
                :
                value === '&laquo;' || value === '... '
                    ?
                    1
                    :
                    value === '&lsaquo;'
                        ?
                        Math.max(+prev.get('page') - 1, 1)
                        :
                        value === '&rsaquo;'
                            ?
                            Math.min((+prev.get('page') || 1) + 1, totalUsersPages)
                            :
                            +value;
            const queryString = new URLSearchParams(prev.toString());
            queryString.set('page', newPage.toString());
            return queryString;
        });
    }, [setQuery, totalUsersPages]);
    const getPage: IFuncNumber = (): number => {
        return Math.ceil(totalUsers / usersLimit);
    };
    const dataPagination: IPagination = {
        totalPages: totalUsersPages,
        page: pageUsers >= totalUsersPages ? getPage() : pageUsers,
        siblings: 2,
        limit: usersLimit,
        pageChanger,
    };

    return (
        <div>
            <Users />
            {
                totalUsersPages > 1 && <PaginationApp dataPagination={ dataPagination } />
            }
        </div>
    );
};

export {
    UsersPanel
};
