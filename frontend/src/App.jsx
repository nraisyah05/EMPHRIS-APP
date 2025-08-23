// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

import User_Dashboard from './pages/USER/User_Dashboard';
import HRDashboard from './pages/HR/HR_Dashboard';
import MainLayout from './components/MainLayout';

const checkAuth = () => {
  return localStorage.getItem('user') !== null;
};

const PrivateRoute = ({ children, role }) => {
  const isAuthenticated = checkAuth();
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    const correctPath = user.role === 'hr' ? '/hr-dashboard' : '/user-dashboard';
    return <Navigate to={correctPath} replace />;
  }
  
  // Kirim prop `role` ke MainLayout
  return <MainLayout role={user.role}>{children}</MainLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rute yang menggunakan MainLayout */}
        <Route path="/user-dashboard" element={
          <PrivateRoute role="user">
            <User_Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/hr-dashboard" element={
          <PrivateRoute role="hr">
            <HRDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;