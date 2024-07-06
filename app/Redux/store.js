// import { configureStore } from "@reduxjs/toolkit";

// export default configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });

import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
};
const reducer = combineReducers({
    user: userSlice,
})
const persistedReducer = persistReducer(persistConfig, reducer)

const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
})

const persistor = persistStore(Store);

export { Store, persistor };