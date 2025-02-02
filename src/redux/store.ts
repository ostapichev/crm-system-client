import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { adminPanelReducer, authReducer, commentReducer, groupReducer, orderReducer } from './slices';


const rootReducer = combineReducers({
    adminPanelReducer,
    authReducer,
    commentReducer,
    groupReducer,
    orderReducer,
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
