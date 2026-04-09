import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="h-screen flex bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">

            <div className="hidden md:flex w-64 fixed left-0 top-0 h-full z-40">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col md:ml-64">

                <div className="fixed top-0 left-0 md:left-64 right-0 z-30">
                    <Navbar />
                </div>

                <main className="mt-16 h-[calc(100vh-64px)] overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Layout;