import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await API.post("/api/auth/login", credentials);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post("/api/auth/register", data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;

            if (!token) throw new Error("No token");

            const res = await API.get("/api/auth/getUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
        }
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                };

                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REGISTER USER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                };

                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET USER
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                };
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;