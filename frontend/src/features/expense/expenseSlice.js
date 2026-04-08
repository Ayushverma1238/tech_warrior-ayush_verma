import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchExpenses = createAsyncThunk(
    "expense/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/api/expense?userId=1");
            return res.data;
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
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});

export default expenseSlice.reducer;