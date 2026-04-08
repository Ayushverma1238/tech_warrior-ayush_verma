import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded-lg hover:bg-gray-700 transition";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">FinFlow</h1>

      <nav className="space-y-3">
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