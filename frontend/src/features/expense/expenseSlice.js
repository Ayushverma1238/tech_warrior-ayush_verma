import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchExpenses = createAsyncThunk(
    "expense/fetch",
    async (_, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user?.id;
            const res = await API.get(`/api/expense?userId=${userId}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const addExpense = createAsyncThunk(
    "expense/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post("/api/expense/add", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default expenseSlice.reducer;