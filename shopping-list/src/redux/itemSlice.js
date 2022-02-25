import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ENDPOINT_API = 'https://mockdata.roughsketch.es/api/items';

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

export const updateItemAsync = createAsyncThunk(
    'items/updateItemAsync',
    async (payload) => {
        const resp = await fetch(`${ENDPOINT_API}/${payload.id}`, {
            method: 'PUT',
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

export const toggleStatusAsync = createAsyncThunk(
    'items/toggleStatusAsync',
    async ({ id, field, status }) => {
        let submitData = {};
        submitData[field] = status;
        const resp = await fetch(`${ENDPOINT_API}/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body: JSON.stringify(submitData),
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

export const updateOrderAsync = createAsyncThunk(
    'items/updateOrderAsync',
    async (payload) => {
        const resp = await fetch(ENDPOINT_API + '/reorder', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body: JSON.stringify(payload),
        });

        if (resp.ok) {
            const items = await resp.json();

            return { items };
        }
    }
)

export const itemSlice = createSlice({
    name: 'items',
    initialState: [],
    //UPDATE USER FEEDBACK IMMEDIATELY WHILE SERVER WORKS IN BACKGROUND
    reducers: {
        toggleStatus: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index][action.payload.field] = action.payload.status;
        },
        updateItem: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index] = action.payload;
        },
    },
    extraReducers: {
        [getItemsAsync.fulfilled]: (state, action) => {
            return action.payload.items;
        },
        [addItemAsync.fulfilled]: (state, action) => {
            state.push(action.payload.item);
        },
        [updateItemAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.item.id
            );
            state[index] = action.payload.item;
        },
        [toggleStatusAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.item.id
            );
            state[index] = action.payload.item;
        },
        [deleteItemAsync.fulfilled]: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        [updateOrderAsync.fulfilled]: (state, action) => {
            return action.payload.items;
        },
    },
});

export const { toggleStatus, updateItem } = itemSlice.actions

export default itemSlice.reducer;