import { Routes, Route } from "react-router-dom";

import Login from "../pages/student/Login";
import Signup from "../pages/student/Signup";
import Dashboard from "../pages/student/Dashboard";
import Profile from "../pages/student/Profile";
import Companies from "../pages/student/Companies";
import ResumeUpload from "../pages/student/ResumeUpload";
import Notifications from "../pages/student/Notifications";
import Applications from "../pages/student/Applications";

function StudentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/ResumeUpload" element={<ResumeUpload />} />
      <Route
        path="/notifications"
        element={<Notifications />}
      />
      <Route
        path="/applications"
        element={<Applications />}
      />
    </Routes>
  );
}

export default StudentRoutes;