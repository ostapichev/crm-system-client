import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';

import { adminPanelService } from '../../services';
import { IStatisticOrders, IParams, IUser, IErrorResponse, IQueryUsers, IActivateUser } from '../../interfaces';

interface IState {
    users: IUser[];
    pageUsers: number;
    usersLimit: number;
    totalUsers: number;
    totalUsersPages: number;
    userTrigger: boolean;
    loading: boolean;
    orderStatistic: IStatisticOrders;
    userStatistic: IStatisticOrders;
    activateUser: IActivateUser;
    paramsUsers: IParams;
    errorUser: IErrorResponse;
}

const initialState: IState = {
    users: [],
    pageUsers: 1,
    usersLimit: 0,
    totalUsers: 0,
    totalUsersPages: 0,
    userTrigger: false,
    loading: false,
    orderStatistic: {},
    userStatistic: {},
    activateUser: {},
    paramsUsers: null,
    errorUser: null
};

const getAll = createAsyncThunk<IQueryUsers<IUser[]>, { params: IParams }>(
    'adminPanelSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const { data } = await adminPanelService.getAllUsers(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, { user: IUser }>(
    'adminPanelSlice/create',
    async ({ user }, { rejectWithValue }) => {
        try {
            await adminPanelService.createUser(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const ban = createAsyncThunk<void, { id: number }>(
    'adminPanelSlice/ban',
    async ({ id }, { rejectWithValue }) => {
        try {
            await adminPanelService.banUser(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const unban = createAsyncThunk<void, { id: number }>(
    'adminSlice/unban',
    async ({ id }, { rejectWithValue }) => {
        try {
            await adminPanelService.unBanUser(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticOrder = createAsyncThunk<IStatisticOrders, void>(
    'adminPanelSlice/getStatisticOrder',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await adminPanelService.getStatisticOrder();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticUser = createAsyncThunk<IStatisticOrders, { id: number }>(
    'adminPanelSlice/getStatisticUser',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await adminPanelService.getStatisticUser(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getActivateUser = createAsyncThunk<IActivateUser, { id: number}>(
    'adminPanelSlice/getActivateUser',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await adminPanelService.getActivateUser(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const slice = createSlice({
    name: 'adminPanelSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pageUsers = action.payload;
        },
        setDefault: state => {
            state.paramsUsers = {};
            state.errorUser = null;
        },
        setErrorActivation: (state, action) => {
            state.activateUser.message = action.payload;
        },
        setCloseFeedbackActivation: state => {
            state.activateUser.message = null;
            state.errorUser = null;
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const { data, page, limit, total } = action.payload;
            state.users = data;
            state.totalUsers = total;
            state.pageUsers = page;
            state.usersLimit = limit;
            state.totalUsersPages = Math.ceil(total / state.usersLimit);
        })
        .addCase(getStatisticOrder.fulfilled, (state, action) => {
            state.orderStatistic = action.payload;
        })
        .addCase(getStatisticUser.fulfilled, (state, action) => {
            state.userStatistic = action.payload;
        })
        .addCase(getActivateUser.fulfilled, (state, action) => {
            state.activateUser = action.payload;
            state.activateUser.message = JSON.stringify(state.activateUser.message);
            state.loading = false;
            state.userTrigger = !state.userTrigger;

        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorUser = null;
        })
        .addMatcher(isFulfilled(create, ban, unban), state => {
            state.userTrigger = !state.userTrigger;
            state.loading = false;
            state.errorUser = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorUser = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.loading = false;
            state.errorUser = action.payload;
        })
});

const { actions, reducer: adminPanelReducer } = slice;
const adminPanelActions = {
    ...actions,
    getAll,
    create,
    ban,
    unban,
    getStatisticOrder,
    getStatisticUser,
    getActivateUser,
};

export {
    adminPanelActions,
    adminPanelReducer,
};
