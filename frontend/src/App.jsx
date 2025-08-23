// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import User_Dashboard from "./pages/USER/User_Dashboard";
import HRDashboard from "./pages/HR/HR_Dashboard";
import MainLayout from "./components/MainLayout";

// ✅ Fungsi cek autentikasi
const checkAuth = () => {
  return localStorage.getItem("user") !== null;
};

// ✅ Komponen untuk proteksi route + cek role
const PrivateRoute = ({ children, role }) => {
  const isAuthenticated = checkAuth();
  const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    // Redirect otomatis sesuai role user
    const correctPath = user.role === "hr" ? "/hr-dashboard" : "/user-dashboard";
    return <Navigate to={correctPath} replace />;
  }

  // ✅ Bungkus semua page dengan MainLayout + prop role
  return <MainLayout role={user.role}>{children}</MainLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login (public) */}
        <Route path="/" element={<Login />} />

        {/* Halaman User */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute role="user">
              <User_Dashboard />
            </PrivateRoute>
          }
        />

        {/* Halaman HR */}
        <Route
          path="/hr-dashboard"
          element={
            <PrivateRoute role="hr">
              <HRDashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
