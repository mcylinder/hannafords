import { createSlice } from '@reduxjs/toolkit'
import { reactLocalStorage } from 'reactjs-localstorage';

const initialState = {
    airTable: [],
    searchTerm: ''
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
        updateSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateFromAirTable, updateSearchTerm } = itemSlice.actions

export default itemSlice.reducer