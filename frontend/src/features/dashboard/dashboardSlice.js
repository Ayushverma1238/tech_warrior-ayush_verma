import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// Async API call
export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/api/dashboard");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Error");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;