import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// server.js
// import './src/api/deleteUser.js';
import Login from './pages/Login';
import HandleRedirect from './components/HandleRedirect';
import HRDashboard from './pages/HR/HR_Dashboard';
import User_Dashboard from './pages/USER/User_Dashboard';
import DefaultDashboard from './components/DefaultDashboard';
import MainLayout from './components/MainLayout';
import TimesheetRequests from './pages/HR/Timesheet/TimesheetRequests';
import WorkSchedule from './pages/HR/Timesheet/WorkSchedule';
import HR_LeaveRequests from './pages/HR/HR_LeaveRequests';
import HR_TravelRequests from './pages/HR/HR_TravelRequests';
import FormTimesheet from './pages/USER/Timesheet/FormTimesheet';
import PersonalData from './pages/USER/PersonalData/PersonalData';
import Family from './pages/USER/PersonalData/Family';
import Payslip from './pages/USER/Payslip/Payslip';
import Documents from './pages/USER/Dokumen/Dokumen';
import OrgSearch from './pages/USER/StrukturOrganisasi/OrgSearch';
import OrgChart from './pages/USER/StrukturOrganisasi/OrgChart';
import KelolaPayslipHR from './pages/HR/Payslip/KelolaPayslipHR';
import KelolaDokumen from './pages/HR/Dokumen/KelolaDokumen';
import DataKaryawan from './pages/HR/DataKaryawan/DataKaryawan';
import FormKaryawan from './pages/HR/DataKaryawan/FormKaryawan';
import RegisterHRIS from './pages/HR/DataKaryawan/RegisterHRIS';
import PreviewEditKaryawan from './pages/HR/DataKaryawan/PreviewEditKaryawan';
import RequestPerubahanData from './pages/HR/DataKaryawan/RequestPerubahanData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/handle-redirect" element={<HandleRedirect />} />

        {/* HR */}
        <Route path="/hr-dashboard" element={<MainLayout role="HR"><HRDashboard /></MainLayout>} />
        {/* Kelola Timehseet */}
        <Route path="/hr-dashboard/requests" element={<MainLayout role="HR"><TimesheetRequests /></MainLayout>} />
        <Route path="/hr-dashboard/management" element={<MainLayout role="HR"><WorkSchedule /></MainLayout>} />
        {/* Cuti */}
        <Route path="/hr-dashboard/leave" element={<MainLayout role="HR"><HR_LeaveRequests /></MainLayout>} />
        {/* Travel Request */}
        <Route path="/hr-dashboard/travelrequest" element={<MainLayout role="HR"><HR_TravelRequests /></MainLayout>} />
        {/* Payslip */}
        <Route path="/hr-dashboard/payslip" element={<MainLayout role="HR"><KelolaPayslipHR /></MainLayout>} />
        {/* Dokumen */}
        <Route path="/hr-dashboard/document" element={<MainLayout role="HR"><KelolaDokumen /></MainLayout>} />
        {/* Data Karyawan */}
        <Route path="/hr-dashboard/data-karyawan" element={<MainLayout role="HR"><DataKaryawan /></MainLayout>} />
        <Route path="/hr-dashboard/data-karyawan/tambah-data" element={<MainLayout role="HR"><FormKaryawan /></MainLayout>} />
        {/* <Route path="/hr-dashboard/data-karyawan/detail" element={<MainLayout role="HR"><DetailKaryawan /></MainLayout>} /> */}
        <Route path="/hr-dashboard/register-employee" element={<MainLayout role="HR"><RegisterHRIS /></MainLayout>} />
        <Route path="/hr-dashboard/data-karyawan/preview/:userId" element={<MainLayout role="HR"><PreviewEditKaryawan /></MainLayout>} />
        <Route path="/hr-dashboard/data-karyawan/requestperubahandata" element={<MainLayout role="HR"><RequestPerubahanData /></MainLayout>} />

        {/* User */}
        <Route path="/user-dashboard" element={<MainLayout role="USER"><User_Dashboard /></MainLayout>} />
        <Route path="/user-dashboard/timesheet" element={<MainLayout role="USER"><FormTimesheet /></MainLayout>} />
        <Route path="/user-dashboard/personal-data" element={<MainLayout role="USER"><PersonalData /></MainLayout>} />
        <Route path="/user-dashboard/family" element={<MainLayout role="USER"><Family /></MainLayout>} />
        <Route path="/user-dashboard/payslip" element={<MainLayout role="USER"><Payslip /></MainLayout>} />
        <Route path="/user-dashboard/dokumen" element={<MainLayout role="USER"><Documents /></MainLayout>} />
        <Route path="/user-dashboard/struktur-organisasi" element={<MainLayout role="USER"><OrgSearch /></MainLayout>} />
        <Route path="/user-dashboard/struktur-organisasi/chart" element={<MainLayout role="USER"><OrgChart /></MainLayout>} />

        {/* Jika belum terdaftar */}
        <Route path="/default-dashboard" element={<MainLayout><DefaultDashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
