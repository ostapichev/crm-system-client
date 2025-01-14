import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';

import { IErrorResponse, IOrder, IParams, IQueryOrders } from '../../interfaces';
import { orderService } from '../../services';

interface IState {
    orders: IOrder[];
    orderId: number;
    orderUpdate: IOrder;
    pageOrders: number;
    ordersLimit: number;
    totalOrders: number;
    totalPages: number;
    sorting_by: string;
    showOrderForm: boolean;
    sorted: boolean;
    orderTrigger: boolean;
    loading: boolean;
    paramsOrders: IParams;
    errorsOrder: IErrorResponse;
}

const initialState: IState = {
    orders: [],
    orderUpdate: null,
    orderId: null,
    pageOrders: 1,
    ordersLimit: 0,
    totalOrders: 0,
    totalPages: 0,
    sorting_by: null,
    showOrderForm: false,
    sorted: true,
    orderTrigger: false,
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

const update = createAsyncThunk<void, { id: number, order: IOrder }>(
    'orderSlice/update',
    async ({ id, order }, { rejectWithValue }) => {
        try {
            await orderService.update(id, order)
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
            state.pageOrders = action.payload;
        },
        setOrderByParams: state => {
            state.sorted = !state.sorted;
        },
        setSorting: (state, action) => {
            state.sorting_by = action.payload;
        },
        setOrdersDefault: state => {
            state.orders = [];
        },
        setOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload;
            state.showOrderForm = true;
            state.errorsOrder = null;
        },
        setDefault: state => {
            state.sorting_by = null;
            state.sorted = true;
            state.paramsOrders = null;
            state.errorsOrder = null;
        },
        setCloseOrderForm: state => {
            state.showOrderForm = false;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const { data, page, limit, sorting_by, total } = action.payload;
            state.orders = data;
            state.totalOrders = total;
            state.pageOrders = page;
            state.ordersLimit = limit;
            state.sorting_by = sorting_by;
            state.totalPages = Math.ceil(total / state.ordersLimit);
        })
        .addCase(update.fulfilled, state => {
            state.orderUpdate = null;
            state.showOrderForm = false;
            state.orderTrigger = !state.orderTrigger;
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
    update,
};

export {
    orderActions,
    orderReducer,
};
