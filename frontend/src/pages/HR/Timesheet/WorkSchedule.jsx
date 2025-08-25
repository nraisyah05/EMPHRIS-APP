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

// Gaya untuk Manajemen Jadwal Kerja
const Section = styled.section`
  margin-top: 20px;
`;
const ScheduleForm = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const FormGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  select {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;
const Button = styled.button`
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  transition: background-color 0.3s;
`;
const PrimaryButton = styled(Button)`
  background-color: #2196F3;
  color: #fff;
  &:hover {
    background-color: #1976D2;
  }
`;

// Komponen utama yang menggabungkan keduanya
const WorkSchedule = () => {
  const location = useLocation();
  const [employees] = useState([
    { id: 'user-1', name: 'John Doe' },
    { id: 'user-2', name: 'Jane Smith' },
    { id: 'user-3', name: 'Pak Haryo' }
  ]);

  const saveSchedule = () => {
    const employeeId = document.getElementById('employeeSelect').value;
    const scheduleType = document.getElementById('scheduleType').value;

    if (employeeId) {
      console.log(`Jadwal untuk ${employeeId} diubah menjadi ${scheduleType}`);
      alert(`Jadwal kerja berhasil disimpan.`);
    } else {
      alert('Pilih karyawan terlebih dahulu.');
    }
  };

  return (
    <div>
      <h2>Kelola Timesheet</h2>
      <TimesheetNav>
        <NavLink to="/hr-dashboard/timesheet/management" className={location.pathname.endsWith('/hr-dashboard/timesheet/management') ? 'active' : ''}>
          Atur Jadwal Kerja
        </NavLink>
        <NavLink to="/hr-dashboard/timesheet/requests" className={location.pathname.endsWith('/hr-dashboard/timesheet/requests') ? 'active' : ''}>
          Permintaan Masuk
        </NavLink>
      </TimesheetNav>
      
      {/* Kondisional rendering berdasarkan path, menggantikan <Outlet /> */}
      {location.pathname.endsWith('/hr-dashboard/timesheet/management') ? (
        <Section>
          <ScheduleForm>
            <FormGroup>
              <label htmlFor="employeeSelect">Pilih Karyawan:</label>
              <select id="employeeSelect">
                <option value="">-- Pilih Karyawan --</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="scheduleType">Jenis Jadwal:</label>
              <select id="scheduleType">
                <option value="normal">Normal</option>
                <option value="rotate">Rotate</option>
              </select>
            </FormGroup>
            <PrimaryButton onClick={saveSchedule}>
              Simpan Jadwal
            </PrimaryButton>
          </ScheduleForm>
        </Section>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default WorkSchedule;