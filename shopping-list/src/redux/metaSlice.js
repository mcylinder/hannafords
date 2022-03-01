import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,

}

export const metaSlice = createSlice({
    name: 'meta',
    initialState,
    reducers: {
        filterData: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { filterData } = metaSlice.actions

export default metaSlice.reducer