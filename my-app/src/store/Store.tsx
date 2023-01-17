import {configureStore} from "@reduxjs/toolkit";
import newsReducer from "./reducers/NewsReducer";

export const store = configureStore({
    reducer:{
        news: newsReducer
    }
})

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

