import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Companies from "../pages/Companies";
import Applications from "../pages/Applications";
import Analytics from "../pages/Analytics";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default AdminRoutes;