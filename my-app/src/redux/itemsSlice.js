import { createSlice } from '@reduxjs/toolkit'
import { reactLocalStorage } from 'reactjs-localstorage';

const initialState = {
    airTable: [],
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        updateFromAirTable: (state, action) => {
            state.airTable = action.payload;
            reactLocalStorage.remove('itemStorage');
            reactLocalStorage.setObject('itemStorage', action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateFromAirTable } = itemSlice.actions

export default itemSlice.reducer