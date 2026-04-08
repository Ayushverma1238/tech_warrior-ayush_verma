import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Tax from "./pages/Tax";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"

function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Sidebar />

                <div className="flex-1 bg-gray-100 min-h-screen">
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/tax" element={<Tax />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;