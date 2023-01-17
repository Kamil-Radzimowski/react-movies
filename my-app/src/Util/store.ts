import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { movieApi } from "./MovieService";
import newsReducer from "../store/reducers/NewsReducer";

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        news: newsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
})

setupListeners(store.dispatch)
