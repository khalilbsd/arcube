import { configureStore } from '@reduxjs/toolkit'
import { api } from './api/apiBase'
import urlReducer from "./reducer/url.reducer"
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        url: urlReducer
    },
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
})
