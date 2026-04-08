import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    cn(
      "block px-4 py-2 rounded-lg text-sm font-medium",
      isActive
        ? "bg-primary text-white"
        : "text-muted-foreground hover:bg-muted"
    );

  return (
    <div className="w-64 h-screen border-r bg-background p-4">
      <h1 className="text-xl font-bold mb-6">FinFlow</h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/expenses" className={linkClass}>
          Expenses
        </NavLink>
        <NavLink to="/income" className={linkClass}>
          Income
        </NavLink>
        <NavLink to="/tax" className={linkClass}>
          Tax
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;