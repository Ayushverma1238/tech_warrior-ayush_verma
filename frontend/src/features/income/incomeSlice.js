// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../../services/api";

// export const fetchIncome = createAsyncThunk(
//     "income/fetch",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await API.get("/api/income?userId=1");
//             return res.data.data; 
//         } catch (err) {
//             return rejectWithValue(err.response?.data);
//         }
//     }
// );

// const incomeSlice = createSlice({
//     name: "income",
//     initialState: {
//         list: [],
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchIncome.fulfilled, (state, action) => {
//             state.list = action.payload;
//         });
//     },
// });

// export default incomeSlice.reducer;













import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchIncome = createAsyncThunk(
    "income/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/api/income"); 
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch income"
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
            .addCase(fetchIncome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload || [];
            })
            .addCase(fetchIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default incomeSlice.reducer;