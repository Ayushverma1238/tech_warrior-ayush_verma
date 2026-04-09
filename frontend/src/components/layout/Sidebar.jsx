import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

import {
    LayoutDashboard,
    Wallet,
    TrendingUp,
    Receipt,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Expenses", path: "/expenses", icon: Receipt },
    { name: "Income", path: "/income", icon: TrendingUp },
    { name: "Tax", path: "/tax", icon: Wallet },
];

export const SidebarContent = ({ onClick }) => (
    <>
        <div className="mb-8">
            <h1 className="text-2xl font-bold">FinFlow</h1>
            <p className="text-xs text-gray-500">Finance Simplified</p>
        </div>

        <nav className="space-y-2">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClick} 
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition",
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        )
                    }
                >
                    <item.icon size={18} />
                    {item.name}
                </NavLink>
            ))}
        </nav>
    </>
);

const Sidebar = () => {
    return (
        <div className="w-64 h-screen border-r bg-white/80 backdrop-blur-xl p-5 hidden md:flex flex-col">
            <SidebarContent />
        </div>
    );
};

export default Sidebar;