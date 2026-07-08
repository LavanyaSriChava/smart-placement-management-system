import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUser,
  FaFileUpload,
  FaBell,
  FaBriefcase
} from "react-icons/fa";

function Navbar() {

  const location = useLocation();

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
      path: "/ResumeUpload",
      label: "Resume",
      icon: <FaFileUpload />
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
            Smart Placement
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

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;