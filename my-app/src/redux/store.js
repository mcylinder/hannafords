import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './itemsSlice';

export const store = configureStore({
    reducer: {
        item: itemReducer,
    },
})