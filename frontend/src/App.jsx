import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HandleRedirect from './components/HandleRedirect';
import HRDashboard from './pages/HR/HR_Dashboard';
import User_Dashboard from './pages/USER/User_Dashboard';
import DefaultDashboard from './components/DefaultDashboard';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/handle-redirect" element={<HandleRedirect />} />
        <Route path="/hr-dashboard" element={<MainLayout role="HR"><HRDashboard /></MainLayout>} />
        <Route path="/user-dashboard" element={<MainLayout role="USER"><User_Dashboard /></MainLayout>} />
        <Route path="/default-dashboard" element={<MainLayout><DefaultDashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
