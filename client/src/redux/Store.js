import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slices/UserSlice'
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
import  searchSlice  from './slices/SearchSlice';
import cartSlice from './slices/CartSlice';

const persistConfig = {
    key : "root",
    version : 1,
    storage
}
const reducer = combineReducers({
    userData : userSlice,
    searchData : searchSlice,
    cartData : cartSlice
})

const persistedReducer = persistReducer(persistConfig,reducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//  const store = configureStore({
//   reducer: {
//     userData : userSlice
//   }
// })

export default store