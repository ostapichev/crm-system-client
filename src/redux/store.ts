import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer, commentReducer, groupReducer, orderReducer, orderReducer2 } from './slices';

const rootReducer = combineReducers({
    authReducer,
    commentReducer,
    groupReducer,
    orderReducer,
    orderReducer2,
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch,
};

export {
    setupStore
};
