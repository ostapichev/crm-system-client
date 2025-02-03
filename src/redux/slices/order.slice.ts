import { AxiosError, AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import FileSaver from 'file-saver';

import { IErrorResponse, IOrder, IParams, IQueryOrders } from '../../interfaces';
import { orderService } from '../../services';

interface IState {
    orders: IOrder[];
    orderUpdate: IOrder;
    pageOrders: number;
    ordersLimit: number;
    totalOrders: number;
    totalOrdersPages: number;
    sorting_by: string;
    showOrderForm: boolean;
    sorted: boolean;
    orderTrigger: boolean;
    loading: boolean;
    checkbox: boolean;
    paramsOrders: IParams;
    errorsOrder: IErrorResponse;
}

const initialState: IState = {
    orders: [],
    orderUpdate: null,
    pageOrders: 1,
    ordersLimit: 0,
    totalOrders: 0,
    totalOrdersPages: 0,
    sorting_by: null,
    showOrderForm: false,
    sorted: true,
    orderTrigger: false,
    loading: false,
    checkbox: true,
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

const create = createAsyncThunk<void, { order: IOrder }>(
    'orderSlice/create',
    async ({ order }, { rejectWithValue }) => {
        try {
            await orderService.create(order);
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

const getExelFile = createAsyncThunk<void, { params: IParams }>(
    'orderSlice/getExelFile',
    async ({ params }, { rejectWithValue }) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.sheet;charset=UTF-8";
        const fileName: string = dayjs().format('YYYY-MM-DD').toString();
        try {
            const response: AxiosResponse = await orderService.createExelFile(params);
            const blob = new Blob([response.data],{type: fileType});
            return FileSaver.saveAs(blob,`${fileName}.xlsx`);
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
        setSortingBy: (state, action) => {
            state.sorting_by = action.payload;
        },
        setDefaultSorted: (state, action) => {
            state.sorted = action.payload;
        },
        setOrdersDefault: state => {
            state.orders = [];
        },
        setOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload;
            state.showOrderForm = true;
            state.errorsOrder = null;
        },
        setCreateOrder: state => {
            state.showOrderForm = true;
            state.errorsOrder = null;
        },
        setCheckBox: state => {
            state.checkbox = !state.checkbox;
        },
        setDefaultCheckBox: state => {
            state.checkbox = false;
        },
        setDefault: state => {
            state.sorting_by = null;
            state.sorted = true;
            state.checkbox = true;
            state.paramsOrders = null;
            state.errorsOrder = null;
        },
        setCloseOrderForm: state => {
            state.showOrderForm = false;
            state.orderUpdate = null;
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const { data, page, limit, sorting_by, total } = action.payload;
            state.orders = data;
            state.totalOrders = total;
            state.pageOrders = page;
            state.ordersLimit = limit;
            state.sorting_by = sorting_by;
            state.totalOrdersPages = Math.ceil(total / state.ordersLimit);
        })
        .addCase(update.fulfilled, state => {
            state.orderUpdate = null;
        })
        .addCase(getExelFile.fulfilled, state => {
            state.ordersLimit = state.totalOrders;
        })
        .addMatcher(isFulfilled(create, update), state => {
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
    create,
    update,
    getExelFile,
};

export {
    orderActions,
    orderReducer,
};
