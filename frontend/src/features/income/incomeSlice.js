import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// FETCH
export const fetchIncome = createAsyncThunk(
    "income/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/api/income");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// ADD
export const addIncome = createAsyncThunk(
    "income/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post("/api/income", data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// DELETE
export const deleteIncome = createAsyncThunk(
    "income/delete",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/api/income/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// UPDATE
export const updateIncome = createAsyncThunk(
    "income/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await API.put(`/api/income/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

const incomeSlice = createSlice({
    name: "income",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchIncome.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })

            // ADD
            .addCase(addIncome.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })

            // DELETE
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.list = state.list.filter(i => i.id !== action.payload);
            })

            // UPDATE
            .addCase(updateIncome.fulfilled, (state, action) => {
                const index = state.list.findIndex(i => i.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            });
    },
});

export default incomeSlice.reducer;