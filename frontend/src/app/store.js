import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import expenseReducer from "../features/expense/expenseSlice";
import incomeReducer from "../features/income/incomeSlice";
import taxReducer from "../features/tax/taxSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        expense: expenseReducer,
        income: incomeReducer,
        tax: taxReducer,
    },
});