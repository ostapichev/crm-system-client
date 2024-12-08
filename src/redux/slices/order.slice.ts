import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';

import { IErrorOrder, IOrder, IParams, IQueryOrders } from '../../interfaces';
import { orderService } from '../../services';

interface IState {
    orders: IOrder[];
    page: number;
    limit: number;
    totalOrders: number;
    totalPages: number;
    sorting_by: string;
    sorted: boolean;
    trigger: boolean;
    loading: boolean;
    paramsOrders: IParams;
    errorsOrder: IErrorOrder;
}

const initialState: IState = {
    orders: [],
    page: 1,
    limit: 0,
    totalOrders: 0,
    totalPages: 0,
    sorting_by: null,
    sorted: true,
    trigger: false,
    loading: false,
    paramsOrders: null,
    errorsOrder: null,
};

const getAll = createAsyncThunk<IQueryOrders<IOrder[]>, { params: IParams }>(
    'orderSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getAll(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setOrderByParams: state => {
            state.sorted = !state.sorted;
        },
        setSorting: (state, action) => {
            state.sorting_by = action.payload;
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const { data, page, limit, sorting_by, total } = action.payload;
            state.orders = data;
            state.totalOrders = total;
            state.page = page;
            state.limit = limit;
            state.sorting_by = sorting_by;
            state.totalPages = Math.ceil(total / state.limit);
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorsOrder = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorsOrder = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorsOrder = action.payload;
            state.loading = false;
        })
});

const { actions, reducer: orderReducer } = slice;
const orderActions = {
    ...actions,
    getAll,
};

export {
    orderActions,
    orderReducer,
};
