import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HandleRedirect from './components/HandleRedirect';
import HRDashboard from './pages/HR/HR_Dashboard';
import User_Dashboard from './pages/USER/User_Dashboard';
import DefaultDashboard from './components/DefaultDashboard';
import MainLayout from './components/MainLayout';
import TimesheetRequests from './pages/HR/Timesheet/TimesheetRequests';
import WorkSchedule from './pages/HR/Timesheet/WorkSchedule';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/handle-redirect" element={<HandleRedirect />} />
        {/* HR */}
        <Route path="/hr-dashboard" element={<MainLayout role="HR"><HRDashboard /></MainLayout>} />
        <Route path="/hr-dashboard/timesheet/requests" element={<MainLayout role="HR"><TimesheetRequests /></MainLayout>} />
        <Route path="/hr-dashboard/timesheet/management" element={<MainLayout role="HR"><WorkSchedule /></MainLayout>} />

        {/* User */}
        <Route path="/user-dashboard" element={<MainLayout role="USER"><User_Dashboard /></MainLayout>} />

        {/* Jika belum terdaftar */}
        <Route path="/default-dashboard" element={<MainLayout><DefaultDashboard /></MainLayout>} />
         <Route path="/user-dashboard/timesheet" element={<Timesheet />} />
        
       

      </Routes>
    </Router>
  );
}

export default App;
