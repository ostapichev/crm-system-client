import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';

import { authService } from '../../services';
import { IAuth, IErrorResponse, IUser } from '../../interfaces';

interface IState {
    me: IUser;
    loading: boolean;
    authTrigger: boolean;
    errorConfirmPassword: string;
    errorAuth: IErrorResponse;
}

const initialState: IState = {
    me: null,
    loading: false,
    authTrigger: true,
    errorConfirmPassword: null,
    errorAuth: null,
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

const activateRequestUser = createAsyncThunk<void, { formData: FormData, activateToken: string }>(
    'authSlice/activateRequestUser',
    async ({ formData, activateToken }, { rejectWithValue }) => {
        try {
             return await authService.activateRequestUser(formData, activateToken);
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
        setConfirmPassword: (state, action) => {
            state.errorConfirmPassword = action.payload;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
    },
    extraReducers: builder => builder
        .addCase(me.rejected, state => {
            state.loading = false;
            state.errorAuth = null;
        })
        .addCase(activateRequestUser.fulfilled, state => {
            state.errorConfirmPassword = null;
        })
        .addCase(logout.fulfilled, state => {
            state.loading = false;
            state.me = null;
            state.errorAuth = null;
        })
        .addMatcher(isFulfilled(login, me), (state, action) => {
            state.me = action.payload;
            state.errorAuth = null;
            state.loading = true;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorAuth = null;
        })
        .addMatcher(isRejectedWithValue(), (state, actions) => {
            state.errorAuth = actions.payload as IErrorResponse;
            state.loading = false;
        })
});

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    login,
    logout,
    activateRequestUser,
    me,
};

export {
    authReducer,
    authActions,
};
