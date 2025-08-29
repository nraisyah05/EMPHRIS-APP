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
  select, input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const SearchInput = styled.input`
  /* Gaya khusus untuk input pencarian */
`;

const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ResultItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &.selected {
    background-color: #e0e0e0;
    font-weight: bold;
  }
`;

// Gaya baru untuk tampilan profil
const EmployeeProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  margin: 15px 0;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4CAF50;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailText = styled.p`
  margin: 2px 0;
  font-size: 0.95rem;
  strong {
    color: #444;
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

// Komponen utama
const WorkSchedule = () => {
  const location = useLocation();
  const allEmployees = [
    {
      id: 'user-1',
      name: 'John Doe',
      worker_no: 'EMP001',
      email: 'john.doe@company.com',
      company: 'PT EMP',
      profile_pic: 'https://images.unsplash.com/photo-1507003211169-0a2dd7c8fe22?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      worker_no: 'EMP002',
      email: 'jane.smith@company.com',
      company: 'PT EMP',
      profile_pic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'user-3',
      name: 'Michael Chen',
      worker_no: 'EMP003',
      email: 'michael.chen@company.com',
      company: 'PT EMP',
      profile_pic: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 'user-4',
      name: 'Sarah Kim',
      worker_no: 'EMP004',
      email: 'sarah.kim@company.com',
      company: 'PT EMP',
      profile_pic: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = allEmployees.filter(employee =>
        employee.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
    setSelectedEmployee(null); // Reset profil jika input berubah
  };

  const handleSelectEmployee = (employee) => {
    setSearchTerm(employee.name);
    setSelectedEmployee(employee);
    setFilteredEmployees([]); // Sembunyikan daftar setelah memilih
  };

  const saveSchedule = () => {
    if (selectedEmployee) {
      const scheduleType = document.getElementById('scheduleType').value;
      if (!scheduleType) {
        alert('Pilih jenis jadwal terlebih dahulu.');
        return;
      }
      console.log(`Jadwal untuk ${selectedEmployee.name} diubah menjadi ${scheduleType}`);
      alert(`Jadwal kerja untuk ${selectedEmployee.name} berhasil disimpan.`);
    } else {
      alert('Pilih karyawan terlebih dahulu.');
    }
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
      
      {location.pathname.endsWith('/hr-dashboard/management') ? (
        <Section>
          <ScheduleForm>
            <FormGroup>
              <label htmlFor="employeeSearch">Cari Karyawan:</label>
              <SearchInput 
                type="text" 
                id="employeeSearch"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Ketik nama karyawan..."
              />
              {searchTerm && filteredEmployees.length > 0 && (
                <SearchResults>
                  {filteredEmployees.map((employee) => (
                    <ResultItem 
                      key={employee.id} 
                      onClick={() => handleSelectEmployee(employee)}
                      className={selectedEmployee?.id === employee.id ? 'selected' : ''}
                    >
                      {employee.name}
                    </ResultItem>
                  ))}
                </SearchResults>
              )}
            </FormGroup>

            {selectedEmployee && (
              <EmployeeProfile>
                <ProfilePicture src={selectedEmployee.profile_pic} alt={selectedEmployee.name} />
                <ProfileDetails>
                  <DetailText><strong>Nama:</strong> {selectedEmployee.name}</DetailText>
                  <DetailText><strong>No. Pekerja:</strong> {selectedEmployee.worker_no}</DetailText>
                  <DetailText><strong>Email:</strong> {selectedEmployee.email}</DetailText>
                  <DetailText><strong>Company:</strong> {selectedEmployee.company}</DetailText>
                </ProfileDetails>
              </EmployeeProfile>
            )}

            <FormGroup>
              <label htmlFor="scheduleType">Jenis Jadwal:</label>
              <select id="scheduleType">
                <option value="">-- Pilih Jadwal --</option>
                <option value="20-10">20-10</option>
                <option value="14-14">14-14</option>
                <option value="5-2">5-2</option>
                <option value="14-7">14-7</option>
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