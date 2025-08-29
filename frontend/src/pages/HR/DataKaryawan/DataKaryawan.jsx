// src/pages/DataKaryawan.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const DataKaryawan = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        const { data, error } = await supabase.from('users').select('employee_code, full_name, email, department, position, id');
        if (data) {
            setEmployees(data);
        } else {
            console.error('Gagal memuat daftar karyawan:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            return;
        }

        const { error } = await supabase.auth.admin.deleteUser(employeeId);

        if (error) {
            console.error('Error deleting user:', error.message);
            alert('Gagal menghapus data: ' + error.message);
        } else {
            setEmployees(employees.filter(emp => emp.id !== employeeId));
            alert('Data karyawan berhasil dihapus.');
            console.log('Data karyawan berhasil dihapus:', employeeId);
        }
    };

    const handleExport = async () => {
        try {
            const { data: users, error } = await supabase.from('users').select('employee_code, full_name, email, department, position');

            if (error) {
                throw error;
            }

            if (users.length === 0) {
                alert("Tidak ada data untuk diekspor.");
                return;
            }

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Data Karyawan');

            worksheet.columns = [
                { header: 'No. Pegawai', key: 'employee_code', width: 20 },
                { header: 'Nama Lengkap', key: 'full_name', width: 30 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Departemen', key: 'department', width: 25 },
                { header: 'Jabatan/Posisi', key: 'position', width: 25 },
            ];

            worksheet.addRows(users);
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'Data Karyawan.xlsx');

            alert("Data berhasil diekspor!");
        } catch (err) {
            console.error('Error saat mengekspor data:', err.message);
            alert('Gagal mengekspor data: ' + err.message);
        }
    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const buffer = e.target.result;
                await workbook.xlsx.load(buffer);

                const worksheet = workbook.getWorksheet(1);
                if (!worksheet) {
                    alert("File Excel tidak memiliki worksheet.");
                    return;
                }

                const importedData = [];
                let headerSkipped = false;

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) {
                        headerSkipped = true;
                        return;
                    }
                    const rowData = row.values;
                    importedData.push({
                        employee_code: rowData[1],
                        full_name: rowData[2],
                        email: rowData[3],
                        department: rowData[4],
                        position: rowData[5],
                    });
                });

                if (importedData.length === 0) {
                    alert("File tidak memiliki data.");
                    return;
                }

                const { error } = await supabase.from('users').insert(importedData);

                if (error) {
                    throw error;
                }

                alert("Data berhasil diimpor!");
                fetchEmployees();

            } catch (err) {
                console.error('Error saat mengimpor data:', err.message);
                alert('Gagal mengimpor data: ' + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(emp =>
        (emp.full_name && emp.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (emp.employee_code && emp.employee_code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manajemen Data Karyawan</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <input
                        type="text"
                        placeholder="Cari Nama Lengkap atau No. Pegawai..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded-md w-full md:max-w-sm"
                    />
                    <div className="flex flex-wrap space-x-2 gap-2">
                        <label htmlFor="import-excel" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-center">
                            Import Data
                            <input
                                id="import-excel"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleImport}
                                className="hidden"
                            />
                        </label>
                        <button
                            onClick={handleExport}
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                        >
                            Export Data
                        </button>
                        <Link
                            to="/hr-dashboard/data-karyawan/requestperubahandata"
                            className="bg-amber-500 text-white px-4 py-2 !no-underline rounded-md hover:bg-amber-700 transition-colors text-center"
                        >
                            Request Perubahan Data
                        </Link>
                        <Link
                            to="/hr-dashboard/register-employee"
                            className="bg-green-600 text-white px-4 py-2 !no-underline rounded-md hover:bg-green-700 transition-colors text-center"
                        >
                            Tambah Akun Pegawai
                        </Link>
                    </div>
                </div>

                {filteredEmployees.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">No. Pegawai</th>
                                    <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Nama Lengkap</th>
                                    <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Email</th>
                                    <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Departemen</th>
                                    <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Jabatan/Posisi</th>
                                    <th className="py-3 px-6 text-center text-sm text-gray-600 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEmployees.map((employee, index) => (
                                    <tr key={employee.id} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{employee.employee_code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{employee.full_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{employee.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{employee.department}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-300">{employee.position}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    to={`/hr-dashboard/data-karyawan/preview/${employee.id}`}
                                                    className="inline-flex items-center px-3 py-1.5 border !no-underline border-transparent text-sm font-medium rounded-2 shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                >
                                                    Preview
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(employee.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-2 shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Tidak ada data karyawan ditemukan.</p>
                )}
            </div>
        </div>
    );
};

export default DataKaryawan;