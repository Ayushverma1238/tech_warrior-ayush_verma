import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchExpenses = createAsyncThunk(
    "expense/fetch",
    async (_, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user?.id;
            if (!userId) throw new Error("User not loaded");
            const res = await API.get(`/api/expense?userId=${userId}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

export const addExpense = createAsyncThunk(
    "expense/add",
    async (data, { getState, rejectWithValue }) => {
        try {
            const userId = getState().auth.user?.id;
             console.log("USER ID:", userId);
            console.log("DATA:", data);

            if (!userId) throw new Error("User not found");

            const res = await API.post(
                `/api/expense?userId=${userId}`,
                data,
            );

            console.log("RESPONSE:", res.data);

            return res.data.data;
        } catch (err) {
            console.error("ERROR:", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH
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

            .addCase(addExpense.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            });
    },
});

export default expenseSlice.reducer;