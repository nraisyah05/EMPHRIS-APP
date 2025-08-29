import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Tambahkan data dummy dengan email dan photoUrl
const DUMMY_EMPLOYEES = [
    // IT Department
    { id: 1, noPegawai: 'P001', nama: 'Budi Santoso', email: 'budi.s@techmaju.com', posisiId: 'IT-DIR-01', posisi: 'IT Director', atasanId: null, bawahanIds: ['P002', 'P003', 'P004'], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80' },
    { id: 2, noPegawai: 'P002', nama: 'Siti Aminah', email: 'siti.a@techmaju.com', posisiId: 'IT-MGR-01', posisi: 'IT Manager', atasanId: 'P001', bawahanIds: ['P005', 'P006'], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80' },
    { id: 3, noPegawai: 'P003', nama: 'Joko Susilo', email: 'joko.s@techmaju.com', posisiId: 'IT-DEV-01', posisi: 'Senior Developer', atasanId: 'P001', bawahanIds: ['P007'], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
    { id: 4, noPegawai: 'P004', nama: 'Dewi Lestari', email: 'dewi.l@techmaju.com', posisiId: 'IT-QA-01', posisi: 'QA Lead', atasanId: 'P001', bawahanIds: ['P008'], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80' },
    { id: 5, noPegawai: 'P005', nama: 'Rudi Permana', email: 'rudi.p@techmaju.com', posisiId: 'IT-DEV-02', posisi: 'Mid-Level Developer', atasanId: 'P002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: null }, // photoUrl: null
    { id: 6, noPegawai: 'P006', nama: 'Lisa Mariska', email: 'lisa.m@techmaju.com', posisiId: 'IT-SUP-01', posisi: 'IT Support', atasanId: 'P002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, noPegawai: 'P007', nama: 'Angga Wijaya', email: 'angga.w@techmaju.com', posisiId: 'IT-DEV-03', posisi: 'Junior Developer', atasanId: 'P003', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80' },
    { id: 8, noPegawai: 'P008', nama: 'Putri Rahayu', email: 'putri.r@techmaju.com', posisiId: 'IT-QA-02', posisi: 'QA Tester', atasanId: 'P004', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80' },
    // HR Department
    { id: 9, noPegawai: 'H001', nama: 'Agus Salim', email: 'agus.s@techmaju.com', posisiId: 'HR-MGR-01', posisi: 'HR Manager', atasanId: null, bawahanIds: ['H002'], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', photoUrl: null }, // photoUrl: null
    { id: 10, noPegawai: 'H002', nama: 'Agus Hartono', email: 'agus.h@techmaju.com', posisiId: 'HR-SPV-01', posisi: 'HR Supervisor', atasanId: 'H001', bawahanIds: ['H003', 'H004'], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', photoUrl: null }, // photoUrl: null
    { id: 11, noPegawai: 'H003', nama: 'Citra Kirana', email: 'citra.k@techmaju.com', posisiId: 'HR-REC-01', posisi: 'Recruiter', atasanId: 'H002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', photoUrl: null }, // photoUrl: null
    { id: 12, noPegawai: 'H004', nama: 'Eko Pranoto', email: 'eko.p@techmaju.com', posisiId: 'HR-ADM-01', posisi: 'HR Administrator', atasanId: 'H002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', photoUrl: 'https://images.unsplash.com/photo-1564564321837-a161743007a2?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // FINANCE Department
    { id: 13, noPegawai: 'F001', nama: 'Sinta Dewi', email: 'sinta.d@techmaju.com', posisiId: 'FIN-MGR-01', posisi: 'Finance Manager', atasanId: null, bawahanIds: ['F002'], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 14, noPegawai: 'F002', nama: 'Fajar Kurniawan', email: 'fajar.k@techmaju.com', posisiId: 'FIN-ACC-01', posisi: 'Accountant', atasanId: 'F001', bawahanIds: ['F003'], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 15, noPegawai: 'F003', nama: 'Nia Pratiwi', email: 'nia.p@techmaju.com', posisiId: 'FIN-JNR-01', posisi: 'Junior Accountant', atasanId: 'F002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', photoUrl: null }, // photoUrl: null
    // MARKETING Department
    { id: 16, noPegawai: 'M001', nama: 'Bayu Aditama', email: 'bayu.a@techmaju.com', posisiId: 'MKT-MGR-01', posisi: 'Marketing Manager', atasanId: null, bawahanIds: ['M002', 'M003'], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', photoUrl: 'https://images.unsplash.com/photo-1552058544-ab315e1975e5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 17, noPegawai: 'M002', nama: 'Rina Puspita', email: 'rina.p@techmaju.com', posisiId: 'MKT-SPV-01', posisi: 'Marketing Supervisor', atasanId: 'M001', bawahanIds: ['M004'], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', photoUrl: 'https://images.unsplash.com/photo-1488426862026-3ee32a756a16?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 18, noPegawai: 'M003', nama: 'Taufik Hidayat', email: 'taufik.h@techmaju.com', posisiId: 'MKT-CRE-01', posisi: 'Creative Specialist', atasanId: 'M001', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 19, noPegawai: 'M004', nama: 'Dinda Ayu', email: 'dinda.a@techmaju.com', posisiId: 'MKT-JNR-01', posisi: 'Marketing Staff', atasanId: 'M002', bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', photoUrl: 'https://images.unsplash.com/photo-1600486913747-55e158284589?q=80&w=1629&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const DEFAULT_PHOTO_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export default function OrgSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0) {
            const results = DUMMY_EMPLOYEES.filter(emp =>
                emp.nama.toLowerCase().includes(value.toLowerCase()) ||
                emp.noPegawai.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(results);
            setSearchResults(results);
        } else {
            setSuggestions([]);
            setSearchResults([]);
        }
    };

    const handleSelectSuggestion = (employee) => {
        setSearchTerm(employee.nama);
        setSuggestions([]);
        setSearchResults([employee]);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchResults(suggestions);
        setSuggestions([]);
    };

    const handleShowDetails = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleShowOrgChart = (employee) => {
        navigate(`/user-dashboard/struktur-organisasi/chart?id=${employee.id}`);
    };

    const handleCloseModal = () => {
        setSelectedEmployee(null);
    };

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Pencarian Pegawai</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari nama pegawai..."
                            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-[-1rem] shadow-lg max-h-60 overflow-y-auto">
                                {suggestions.map(emp => (
                                    <li
                                        key={emp.id}
                                        onClick={() => handleSelectSuggestion(emp)}
                                        className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={emp.photoUrl || DEFAULT_PHOTO_URL}
                                                alt={emp.nama}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">{emp.nama}</p>
                                                <p className="text-sm text-gray-500">{emp.posisi} - {emp.departemen}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </form>

                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">No</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">No. Pegawai</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Nama</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Posisi</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {searchResults.length > 0 ? (
                                searchResults.map((employee, index) => (
                                    <tr key={employee.id} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">{index + 1}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{employee.noPegawai}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{employee.nama}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{employee.email}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{employee.posisi}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium border border-gray-200">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleShowDetails(employee)}
                                                    className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                                                >
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => handleShowOrgChart(employee)}
                                                    className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                                                >
                                                    Organisasi
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-500 italic border border-gray-200">
                                        Silakan ketik nama pegawai untuk mencari data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Card Biodata (Modal) */}
            {selectedEmployee && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <h3 className="text-xl font-semibold">Detail Pegawai</h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                                &times;
                            </button>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <img
                                src={selectedEmployee.photoUrl || DEFAULT_PHOTO_URL}
                                alt={selectedEmployee.nama}
                                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gray-300"
                            />
                            <h4 className="text-xl font-bold">{selectedEmployee.nama}</h4>
                            <p className="text-gray-600">{selectedEmployee.posisi}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-500">No. Pegawai:</p>
                            <p className="font-semibold">{selectedEmployee.noPegawai}</p>

                            <p className="text-gray-500">Email:</p>
                            <p className="font-semibold">{selectedEmployee.email}</p>

                            <p className="text-gray-500">Perusahaan:</p>
                            <p className="font-semibold">{selectedEmployee.perusahaan}</p>

                            <p className="text-gray-500">Departemen:</p>
                            <p className="font-semibold">{selectedEmployee.departemen}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}