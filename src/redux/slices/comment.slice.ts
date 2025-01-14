import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import {commentService} from "../../services";
import { IComment, IErrorResponse } from "../../interfaces";

interface IState {
    commentTrigger: boolean;
    commentsLimit: number;
    startShowComment: number;
    endShowComments: number;
    pageComments: number;
    totalPageComments: number;
    loading: boolean;
    errorsComment?: IErrorResponse;
}

const initialState: IState = {
    commentTrigger: false,
    commentsLimit: 5,
    startShowComment: 0,
    endShowComments: 5,
    pageComments: 1,
    totalPageComments: 0,
    loading: false,
    errorsComment: null
};

const create = createAsyncThunk<void, {order_id: number, comment: IComment}>(
    'commentSlice/create',
    async ({ order_id, comment }, { rejectWithValue }) => {
        try {
            await commentService.addComment(order_id, comment);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pageComments = action.payload;
            state.startShowComment = (state.pageComments - 1) * state.commentsLimit;
            state.endShowComments = (state.pageComments - 1) * state.commentsLimit + state.commentsLimit;
        },
    },
    extraReducers: builder => builder
        .addCase(create.fulfilled, state => {
            state.commentTrigger = !state.commentTrigger;
            state.errorsComment = null;
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorsComment = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorsComment = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorsComment = action.payload;
        })
});

const { actions, reducer: commentReducer } = slice;
const commentActions = {
    ...actions,
    create,
};

export {
    commentActions,
    commentReducer,
};
