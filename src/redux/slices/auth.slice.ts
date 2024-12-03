import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { authService } from "../../services";
import { IAuth, IErrorAuth, IUser } from "../../interfaces";

interface IState {
    me: IUser;
    loading: boolean;
    authTrigger: boolean;
    error?: IErrorAuth;
}

const initialState: IState = {
    me: null,
    loading: false,
    authTrigger: true,
    error: null,
};

const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const logout = createAsyncThunk<void, void>(
    'authSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const me = createAsyncThunk<IUser, void> (
    'authSlice/me',
    async () => {
        const { data } = await authService.me();
        return data;
    }
);

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: state => {
            state.me = null;
            state.error = null;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
    },
    extraReducers: builder => builder
        .addCase(me.rejected, state => {
            state.loading = false;
            state.error = null;
        })
        .addMatcher(isFulfilled(login, me), (state, action) => {
            state.me = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.error = null;
        })
        .addMatcher(isRejectedWithValue(), (state, actions) => {
            state.error = actions.payload as IErrorAuth;
            state.loading = false;
        })
});

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    login,
    me
};

export {
    authReducer,
    authActions
};
