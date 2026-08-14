import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaUser,
  FaBell,
  FaBriefcase,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const navLinks = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FaHome />
    },
    {
      path: "/companies",
      label: "Companies",
      icon: <FaBuilding />
    },
    {
      path: "/applications",
      label: "Applications",
      icon: <FaBriefcase />
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: <FaBell />
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <FaUser />
    }
  ];

  return (
  <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-4">

      <div className="flex flex-wrap items-center justify-between py-4">

        <h1 className="text-white text-xl md:text-2xl font-bold">
          Smart Placement Management System
        </h1>

        <div className="flex flex-wrap gap-2 md:gap-4 mt-3 md:mt-0">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
                ${
                  location.pathname === link.path
                    ? "bg-white text-blue-600 font-semibold"
                    : "text-white hover:bg-blue-500"
                }
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-red-500 transition-all duration-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

      </div>

    </div>


    {/* Logout Confirmation Modal */}
    {showLogoutModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">

        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">

          <h2 className="text-xl font-semibold text-slate-800">
            Confirm Logout
          </h2>

          <p className="text-gray-600 mt-3">
            Are you sure you want to logout?
          </p>

          <div className="flex justify-end gap-3 mt-6">

            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    )}

  </nav>
);
}

export default Navbar;