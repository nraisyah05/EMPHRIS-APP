// src/pages/RegisterHRIS.jsx

import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const RegisterHRIS = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (!email || !password || !employeeCode || !fullName || !position || !department || !company) {
            setErrorMessage('Semua kolom harus diisi.');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage('Gagal membuat akun: ' + error.message);
            console.error('Registration error:', error);
            setLoading(false);
            return;
        }

        if (data.user) {
            setSuccessMessage('Akun karyawan berhasil dibuat! Silakan verifikasi email Anda.');

            // Data karyawan lainnya akan dimasukkan oleh trigger database
            // dan dapat diperbarui nanti.
            navigate('/hr-dashboard/data-karyawan/tambah-data', {
                state: {
                    newUserData: {
                        user_id: data.user.id,
                        employee_code: employeeCode,
                        full_name: fullName,
                        email: data.user.email,
                        department: department,
                        position: position,
                        company: company,
                        role: role,
                    }
                }
            });
        }

        setLoading(false);
    };

    // Variabel untuk mengecek apakah form belum terisi
    const isFormIncomplete = !email || !password || !employeeCode || !fullName || !position || !department || !company;

    return (
        <div className="p-2 flex flex-col min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Registrasi Akun Karyawan</h2>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full">
                {successMessage && (
                    <div className="mb-4 text-sm text-green-700 bg-green-100 p-3 rounded-md">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded-md">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Kolom Kiri */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employee Code</label>
                                <input
                                    type="text"
                                    value={employeeCode}
                                    onChange={(e) => setEmployeeCode(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Jabatan/Posisi</label>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Departemen</label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih Peran</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="user">User (Karyawan)</option>
                                    <option value="hr">HR</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-6 justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/hr-dashboard/data-karyawan')}
                            className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-2 hover:bg-red-600 transition-colors"
                        >
                            Kembali
                        </button>
                        <button
                            type="submit"
                            disabled={loading || isFormIncomplete}
                            className={`py-2 px-4 border rounded-2 text-sm font-medium text-white ${loading || isFormIncomplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            {loading ? 'Mendaftarkan...' : 'Daftarkan Akun'}
                        </button>
                    </div>
                </form>
                {/* <div className="flex gap-2 mt-6 justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/hr-dashboard/data-karyawan')}
                        className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-2 hover:bg-red-600 transition-colors"
                    >
                        Kembali
                    </button>
                    <button
                        type="submit"
                        disabled={loading || isFormIncomplete}
                        className={`py-2 px-4 border rounded-2 text-sm font-medium text-white ${loading || isFormIncomplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {loading ? 'Mendaftarkan...' : 'Daftarkan Akun'}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default RegisterHRIS;