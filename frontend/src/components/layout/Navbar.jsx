import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="h-16 bg-white shadow flex justify-between items-center px-6">
        <h1 className="text-xl font-bold text-gray-800">
          Smart Placement Management System
        </h1>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">
            Admin
          </span>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="bg-white w-full max-w-sm mx-4 rounded-2xl shadow-2xl p-6 animate-[fadeIn_0.2s_ease-out]">

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-2xl">
                  🚪
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Logout
            </h2>

            {/* Message */}
            <p className="text-gray-500 text-center mt-2">
              Are you sure you want to logout?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 active:scale-95 transition"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}