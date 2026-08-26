import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/student/Navbar";
import StudentRoutes from "./routes/StudentRoutes";

import AdminLayout from "./components/layout/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Module */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          }
        />

        {/* Student Module */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <StudentRoutes />
            </>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </BrowserRouter>
  );
}

export default App;