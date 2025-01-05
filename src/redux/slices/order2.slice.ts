import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { IErrorOrder, IOrder, IPagination, IParams } from "../../interfaces";
import { orderService } from "../../services";

interface IState {
    orders: IOrder[];
    orderUpdate: IOrder;
    orderCreate: string;
    orderTrigger: boolean;
    loading: boolean;
    totalPagesOrders: number;
    openOrderForm: boolean;
    checkbox: boolean;
    sorted: boolean;
    paramsOrders: IParams;
    errorsOrder: IErrorOrder;
}

const initialState: IState = {
    orders: [],
    orderUpdate: null,
    orderCreate: null,
    orderTrigger: false,
    loading: false,
    totalPagesOrders: 0,
    openOrderForm: false,
    checkbox: false,
    sorted: true,
    paramsOrders: {},
    errorsOrder: null
};

const update = createAsyncThunk<void, {id: number, order: IOrder}>(
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
            state.paramsOrders.page = action.payload;
        },
        setOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload;
            state.openOrderForm = true;
            state.errorsOrder = null;
        },
        setOrderCreate: (state, action) => {
            state.orderCreate = action.payload;
        },
        openForm: state => {
            state.openOrderForm = true;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
            state.errorsOrder = null;
        },
        resetOrders: state => {
            state.orders = [];
        },
        resetParams: state => {
            state.paramsOrders = {};
            state.checkbox = false;
            state.sorted = true;
        }
    },
    extraReducers: builder => builder
        .addCase(update.fulfilled, state => {
            state.orderUpdate = null;
            state.openOrderForm = false;
        })
        .addMatcher(isFulfilled(update), state => {
            state.orderTrigger = !state.orderTrigger;
            state.errorsOrder = null;
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

const {actions, reducer: orderReducer2} = slice;
const orderActions2 = {
    ...actions,
    update,
};

export {
    orderActions2,
    orderReducer2
};
