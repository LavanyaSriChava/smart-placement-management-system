import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-950 p-6">
      <h1 className="text-white text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="space-y-3">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/students" className={linkClass}>
          Students
        </NavLink>

        <NavLink to="/companies" className={linkClass}>
          Companies
        </NavLink>

        <NavLink to="/applications" className={linkClass}>
          Applications
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          Analytics
        </NavLink>
      </div>
    </div>
  );
}