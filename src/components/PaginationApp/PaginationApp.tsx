import { FC } from 'react';

import { Container, Pagination } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IPagination } from '../../interfaces';
import { IFuncBoolean, IPaginateButtons } from '../../types';
import { paginationRangeUtil } from '../../utils';

interface IProps {
    dataPagination: IPagination;
}

const PaginationApp: FC<IProps> = ({ dataPagination }) => {
    const { loading } = useAppSelector(state => state.orderReducer);
    const { page, totalPages, isOpenComments, pageChanger } = dataPagination;
    const disabledButtonPrev: IFuncBoolean = (): boolean => {
        return page === 1;
    };
    const disabledButtonNext: IFuncBoolean = (): boolean => {
        return page === totalPages;
    };
    let buttons: IPaginateButtons = paginationRangeUtil(dataPagination);

    return (
        <Container className='d-flex justify-content-center align-items-center mt-4 w-auto'>
            <Pagination>
                {
                    !isOpenComments &&
                    <Pagination.First
                        onClick={ () => pageChanger('&laquo;') }
                        disabled={ loading || disabledButtonPrev() }
                    />
                }
                <Pagination.Prev
                    onClick={ () => pageChanger('&lsaquo;') }
                    disabled={ loading || disabledButtonPrev() }
                />
                {
                    buttons.map(value => {
                        if (value === page) {
                            return (
                                <Pagination.Item
                                    key={ value }
                                    onClick={ () => pageChanger(value.toString()) }
                                    active
                                >
                                    { value }
                                </Pagination.Item>
                            );
                        } else {
                            return (
                                <Pagination.Item
                                    key={ value }
                                    onClick={ () => pageChanger(value.toString()) }
                                    disabled={ loading }
                                >
                                    { value }
                                </Pagination.Item>
                            );
                        }
                    })
                }
                <Pagination.Next
                    onClick={ () => pageChanger('&rsaquo;') }
                    disabled={ loading || disabledButtonNext() }
                />
                {
                    !isOpenComments &&
                    <Pagination.Last
                        onClick={ () => pageChanger('&raquo;') }
                        disabled={ loading || disabledButtonNext() }
                    />
                }
            </Pagination>
        </Container>
    );
};

export {
    PaginationApp
};
