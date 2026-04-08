import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchIncome = createAsyncThunk(
    "income/fetch",
    async () => {
        const res = await API.get("/api/income?userId=1");
        return res.data;
    }
);

const incomeSlice = createSlice({
    name: "income",
    initialState: {
        list: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIncome.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export default incomeSlice.reducer;