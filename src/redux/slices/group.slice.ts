import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';

import { groupService } from '../../services';
import { IErrorResponse, IGroup } from '../../interfaces';

interface IState {
    groups: IGroup[];
    groupTrigger: boolean;
    groupCreate: string;
    vision: boolean;
    errorGroup: IErrorResponse;
}

const initialState: IState = {
    groups: [],
    groupTrigger: false,
    groupCreate: null,
    vision: false,
    errorGroup: null
};

const getAll = createAsyncThunk<IGroup[], void>(
    'groupSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await groupService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, { group: IGroup }>(
    'groupSlice/create',
    async ({ group }, { rejectWithValue }) => {
        try {
            await groupService.create(group);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        setVision: (state, action) => {
            state.vision = action.payload;
            state.errorGroup = null;
        },
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.groups = action.payload;
            state.errorGroup = null;
        })
        .addCase(create.fulfilled, state => {
            state.groupTrigger = !state.groupTrigger;
            state.errorGroup = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorGroup = action.payload;
        })
});

const { actions, reducer: groupReducer } = slice;
const groupActions = {
    ...actions,
    getAll,
    create,
};

export {
    groupActions,
    groupReducer,
};
