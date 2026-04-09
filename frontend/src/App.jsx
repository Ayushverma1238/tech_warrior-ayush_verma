import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Tax from "./pages/Tax";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./features/auth/authSlice";
import DisableNumberScroll from "./components/common/DisableNumberScroll";
import { Toaster } from "sonner";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <DisableNumberScroll />
            <Toaster position="top-right" />
            <BrowserRouter>
                <Routes>

                    {/* Public */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    {/* Protected */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/tax" element={<Tax />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;