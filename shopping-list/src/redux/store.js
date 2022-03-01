import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './itemSlice';
import metaReducer from './metaSlice';

export default configureStore({
    reducer: {
        items: itemReducer,
        meta: metaReducer,
    },
});
