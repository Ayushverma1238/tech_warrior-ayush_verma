import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchTax = createAsyncThunk(
    "tax/fetch",
    async () => {
        const res = await API.get("/api/tax");
        return res.data;
    }
);

const taxSlice = createSlice({
    name: "tax",
    initialState: {
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTax.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default taxSlice.reducer;