import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Gaya untuk Navigasi Timesheet
const TimesheetNav = styled.nav`
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  color: #555;
  font-weight: bold;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    color: #4CAF50;
    border-bottom: 3px solid #4CAF50;
  }

  &.active {
    color: #4CAF50;
    border-bottom: 3px solid #4CAF50;
  }
`;

// Gaya untuk Daftar Permintaan Timesheet
const Section = styled.section`
  margin-top: 20px;
`;
const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4CAF50;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.h4`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const EmployeeRole = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.9rem;
`;

const RequestDetails = styled.div`
  width: 100%;
  border-top: 1px solid #eee;
  padding-top: 15px;
`;

const DetailText = styled.p`
  margin: 5px 0;
  strong {
    color: #444;
  }
`;

const CardActions = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const ApproveButton = styled(Button)`
  background-color: #4CAF50;
  color: #fff;
  flex-grow: 1;
  &:hover {
    background-color: #45a049;
  }
`;
const RejectButton = styled(Button)`
  background-color: #f44336;
  color: #fff;
  flex-grow: 1;
  &:hover {
    background-color: #d32f2f;
  }
`;

const ViewFullTimesheetButton = styled(Button)`
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ccc;
  width: 100%;
  margin-top: 10px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

// Komponen utama yang menggabungkan keduanya
const TimesheetRequests = () => {
  const location = useLocation();
  const [timesheetRequests] = useState([
    {
      id: 'ts-1',
      full_name: 'John Deon',
      worker_no: 'EMP001',
      email: 'john.doe@company.com',
      company: 'PT EMP',
      working_schedule: 'Rotate',
      profile_pic: 'https://images.unsplash.com/photo-1507003211169-0a2dd7c8fe22?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-23',
      working_category: 'On',
      hours_worked: 8,
      remarks: 'Proyek A selesai lebih cepat.',
      justification: 'Perlu menyesuaikan jam kerja untuk proyek baru.',
      status: 'pending'
    },
    {
      id: 'ts-2',
      full_name: 'Jane Smith',
      worker_no: 'EMP002',
      email: 'jane.smith@company.com',
      company: 'PT EMP',
      working_schedule: 'Normal',
      profile_pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-24',
      working_category: 'Dinas',
      hours_worked: 6,
      remarks: 'Kunjungan ke cabang Surabaya.',
      justification: 'Meeting dengan tim marketing di luar kota.',
      status: 'pending'
    },
    {
      id: 'ts-3',
      full_name: 'Michael Chen',
      worker_no: 'EMP003',
      email: 'michael.chen@company.com',
      company: 'PT EMP',
      working_schedule: 'Rotate',
      profile_pic: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-25',
      working_category: 'On',
      hours_worked: 9,
      remarks: 'Lembur untuk menyelesaikan bug kritis.',
      justification: 'Penyelesaian bug mendesak untuk rilis produk.',
      status: 'pending'
    },
    {
      id: 'ts-4',
      full_name: 'Sarah Kim',
      worker_no: 'EMP004',
      email: 'sarah.kim@company.com',
      company: 'PT EMP',
      working_schedule: 'Normal',
      profile_pic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-25',
      working_category: 'Off',
      hours_worked: 0,
      remarks: 'Cuti sakit, demam tinggi.',
      justification: 'Tidak dapat bekerja karena sakit.',
      status: 'pending'
    },
    {
      id: 'ts-5',
      full_name: 'David Wilson',
      worker_no: 'EMP005',
      email: 'david.wilson@company.com',
      company: 'PT EMP',
      working_schedule: 'Rotate',
      profile_pic: 'https://images.unsplash.com/photo-1521119989659-a851e7317409?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-26',
      working_category: 'On',
      hours_worked: 7.5,
      remarks: 'Mengikuti workshop internal seharian.',
      justification: 'Pengembangan skill untuk proyek mendatang.',
      status: 'pending'
    },
    {
      id: 'ts-6',
      full_name: 'Emily Davis',
      worker_no: 'EMP006',
      email: 'emily.davis@company.com',
      company: 'PT EMP',
      working_schedule: 'Normal',
      profile_pic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      entry_date: '2025-08-26',
      working_category: 'Dinas',
      hours_worked: 8,
      remarks: 'Kunjungan ke klien di Bandung.',
      justification: 'Meeting presentasi produk baru.',
      status: 'pending'
    },
  ]);

  const handleApproval = (timesheetId, status) => {
    console.log(`Timesheet ID: ${timesheetId}, Status: ${status}`);
    alert(`Timesheet ${status} berhasil!`);
  };

  const handleViewFullTimesheet = (workerNo) => {
    console.log(`Melihat timesheet lengkap untuk pekerja: ${workerNo}`);
    alert(`Anda akan diarahkan ke halaman timesheet lengkap untuk ${workerNo}.`);
  };

  return (
    <div>
      <h2>Kelola Timesheet</h2>
      <TimesheetNav>
        <NavLink to="/hr-dashboard/management" className={location.pathname.endsWith('/hr-dashboard/management') ? 'active' : ''}>
          Atur Jadwal Kerja
        </NavLink>
        <NavLink to="/hr-dashboard/requests" className={location.pathname.endsWith('/hr-dashboard/requests') ? 'active' : ''}>
          Permintaan Masuk
        </NavLink>
      </TimesheetNav>
      
      {location.pathname.endsWith('/hr-dashboard/requests') ? (
        <Section>
          <CardList>
            {timesheetRequests.map((request) => (
              <Card key={request.id}>
                <ProfileHeader>
                  <ProfilePicture src={request.profile_pic} alt={request.full_name} />
                  <EmployeeInfo>
                    <EmployeeName>{request.full_name}</EmployeeName>
                    <EmployeeRole>No Pekerja: {request.worker_no}</EmployeeRole>
                  </EmployeeInfo>
                </ProfileHeader>
                <RequestDetails>
                  <DetailText><strong>Email:</strong> {request.email}</DetailText>
                  <DetailText><strong>Jadwal Kerja:</strong> {request.working_schedule}</DetailText>
                  <DetailText><strong>Tanggal Diajukan:</strong> {request.entry_date}</DetailText>
                </RequestDetails>
                <ViewFullTimesheetButton onClick={() => handleViewFullTimesheet(request.worker_no)}>
                  Lihat Timesheet Lengkap
                </ViewFullTimesheetButton>
              </Card>
            ))}
          </CardList>
        </Section>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default TimesheetRequests;