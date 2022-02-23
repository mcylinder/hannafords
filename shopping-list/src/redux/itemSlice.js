import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const ENDPOINT_API = 'http://localhost:8000/api/items';

export const getItemsAsync = createAsyncThunk(
    'items/getItemsAsync',
    async () => {
        const resp = await fetch(ENDPOINT_API);

        if (resp.ok) {
            const items = await resp.json();
            return { items };
        }
    }
);

export const addItemAsync = createAsyncThunk(
    'items/addItemAsync',
    async (payload) => {
        const resp = await fetch(ENDPOINT_API, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body: JSON.stringify(payload),
        });

        if (resp.ok) {
            const item = await resp.json();
            return { item };
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk(
    'items/completeItemAsync',
    async (payload) => {
        const resp = await fetch(`${ENDPOINT_API}/${payload.id}`, {
            method: 'PATCH',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
        });

        if (resp.ok) {
            const item = await resp.json();
            return { item };
        }
    }
);

export const deleteItemAsync = createAsyncThunk(
    'items/deleteItemAsync',
    async (payload) => {
        const resp = await fetch(`${ENDPOINT_API}/${payload.id}`, {
            method: 'DELETE',
            mode: 'cors',
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
);

export const getItemAsync = createAsyncThunk(
    'items/getItemAsync',
    async (payload) => {
        const resp = await fetch(`${ENDPOINT_API}/${payload.id}`);

        if (resp.ok) {
            const item = await resp.json();
            return { item };
        }
    }
);




export const itemSlice = createSlice({
    name: 'items',
    initialState: [],
    reducers: {
        // additem: (state, action) => {
        //     const item = {
        //         id: nanoid(),
        //         title: action.payload.title,
        //         completed: false,
        //     };
        //     state.push(item);
        // },
        // // toggleComplete: (state, action) => {
        // //     const index = state.findIndex((item) => item.id === action.payload.id);
        // //     state[index].completed = action.payload.completed;
        // // },
        // deleteitem: (state, action) => {
        //     return state.filter((item) => item.id !== action.payload.id);
        // },
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            return action.payload.items;
        },
        [addItemAsync.fulfilled]: (state, action) => {
            state.push(action.payload.item);

        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.item.id
            );
            state[index].completed = action.payload.item.completed;
        },
        [deleteItemAsync.fulfilled]: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addItem, toggleComplete, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
