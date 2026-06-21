import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/student/Navbar";
import StudentRoutes from "./routes/StudentRoutes";

import AdminLayout from "./components/layout/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";

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
    </BrowserRouter>
  );
}

export default App;