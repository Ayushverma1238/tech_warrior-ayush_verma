import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

const cleanFilters = (filters) => {
    return Object.fromEntries(
        Object.entries(filters || {}).filter(
            ([_, v]) => v !== "" && v !== null
        )
    );
};

export const fetchIncome = createAsyncThunk(
    "income/fetch",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const cleaned = cleanFilters(filters);

            const query = new URLSearchParams(cleaned).toString();

            const url = query ? `/api/income?${query}` : `/api/income`;

            const res = await API.get(url);

            return res.data?.data || [];
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || "Fetch failed"
            );
        }
    }
);

export const addIncome = createAsyncThunk(
    "income/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post("/api/income", data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Add failed"
            );
        }
    }
);

export const deleteIncome = createAsyncThunk(
    "income/delete",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/api/income/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Delete failed"
            );
        }
    }
);

export const updateIncome = createAsyncThunk(
    "income/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await API.put(`/api/income/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Update failed"
            );
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

            // ================= FETCH =================
            .addCase(fetchIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= ADD =================
            .addCase(addIncome.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })

            // ================= DELETE =================
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (i) => i.id !== action.payload
                );
            })

            // ================= UPDATE =================
            .addCase(updateIncome.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (i) => i.id === action.payload.id
                );

                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default incomeSlice.reducer;