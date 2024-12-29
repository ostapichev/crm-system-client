import { FC } from 'react';

import { Container, Pagination } from 'react-bootstrap';

import { useAppSelector } from '../../hooks';
import { IPagination } from '../../interfaces';
import { IFuncBoolean, IPaginateButtons } from '../../types';
import { returnPaginationRange } from '../../utils';

interface IProps {
    dataPagination: IPagination;
}

const PaginationApp: FC<IProps> = ({ dataPagination }) => {
    const { orders, loading } = useAppSelector(state => state.orderReducer);
    const { page, totalPages, isOpenComments, pageChanger } = dataPagination;
    const disabledButtonPrev: IFuncBoolean = (): boolean => {
        return page === 1;
    };
    const disabledButtonNext: IFuncBoolean = (): boolean => {
        return page === totalPages;
    };
    let buttons: IPaginateButtons = returnPaginationRange(dataPagination);

    return (
        <Container className='d-flex justify-content-center mt-4'>
            <Pagination>
                {
                    !isOpenComments &&
                    <Pagination.First
                        onClick={ () => pageChanger('&laquo;') }
                        disabled={ !orders.length || loading || disabledButtonPrev() }
                    />
                }
                <Pagination.Prev
                    onClick={ () => pageChanger('&lsaquo;') }
                    disabled={ !orders.length || loading || disabledButtonPrev() }
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
                                    disabled={ !orders.length || loading }
                                >
                                    { value }
                                </Pagination.Item>
                            );
                        }
                    })
                }
                <Pagination.Next
                    onClick={ () => pageChanger('&rsaquo;') }
                    disabled={ !orders.length || loading || disabledButtonNext() }
                />
                {
                    !isOpenComments &&
                    <Pagination.Last
                        onClick={ () => pageChanger('&raquo;') }
                        disabled={ !orders.length || loading || disabledButtonNext() }
                    />
                }
            </Pagination>
        </Container>
    );
};

export {
    PaginationApp
};
