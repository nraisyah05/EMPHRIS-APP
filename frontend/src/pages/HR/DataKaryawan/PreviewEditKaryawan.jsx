import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const PreviewEditKaryawan = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Data dari tabel 'users'
        employee_code: '',
        full_name: '',
        email: '',
        department: '',
        position: '',
        // Data dari tabel 'employee_profile' yang baru
        title: '',
        language: '',
        gender: '',
        birth_date: '',
        birth_place: '',
        country: '',
        nationality: '',
        marital_status: '',
        religion: '',
        bank_name: '',
        account_number: '',
        account_holder: '',
        first_degree: '',
        second_degree: '',
        profile_photo: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            setLoading(true);

            // LANGKAH 1: Ambil data dari tabel 'users' menggunakan kolom 'users_id'
            // Nilai dari URL ('userId') cocok dengan kolom 'users_id' di tabel
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id, employee_code, full_name, email, department, position')
                .eq('id', userId)
                .single();

            if (userError) {
                console.error('Error fetching user data:', userError.message);
                alert('Gagal memuat data utama karyawan.');
                navigate('/hr-dashboard/data-karyawan');
                return;
            }

            // Dapatkan nilai 'id' dari hasil langkah 1 untuk digunakan di langkah 2
            const employeeId = userData.id;

            // LANGKAH 2: Ambil data dari 'employee_profile' menggunakan kolom 'user_id'
            // Kita menggunakan nilai 'id' yang telah didapatkan di langkah 1
            const { data: profileData } = await supabase
                .from('employee_profile')
                .select('title, language, gender, birth_date, birth_place, country, nationality, marital_status, religion, bank_name, account_number, account_holder, first_degree, second_degree, profile_photo')
                .eq('user_id', employeeId)
                .single();

            const combinedData = {
                ...userData,
                ...profileData,
            };

            setFormData(combinedData);
            setLoading(false);
        };

        fetchEmployeeData();
    }, [userId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Ambil ID yang benar untuk pembaruan
        const { data: userData } = await supabase.from('users').select('id').eq('id', userId).single();
        if (!userData) {
            alert('ID karyawan tidak ditemukan.');
            return;
        }
        const employeeId = userData.id;

        const userUpdateData = {
            employee_code: formData.employee_code,
            full_name: formData.full_name,
            email: formData.email,
            department: formData.department,
            position: formData.position,
        };

        const profileUpdateData = {
            title: formData.title,
            language: formData.language,
            gender: formData.gender,
            birth_date: formData.birth_date,
            birth_place: formData.birth_place,
            country: formData.country,
            nationality: formData.nationality,
            marital_status: formData.marital_status,
            religion: formData.religion,
            bank_name: formData.bank_name,
            account_number: formData.account_number,
            account_holder: formData.account_holder,
            first_degree: formData.first_degree,
            second_degree: formData.second_degree,
            profile_photo: formData.profile_photo,
        };

        // Update tabel users menggunakan kolom 'id'
        const { error: userUpdateError } = await supabase
            .from('users')
            .update(userUpdateData)
            .eq('id', employeeId);

        // Update tabel employee_profile menggunakan kolom 'user_id'
        const { error: profileUpdateError } = await supabase
            .from('employee_profile')
            .update(profileUpdateData)
            .eq('user_id', employeeId);

        if (userUpdateError || profileUpdateError) {
            alert('Gagal memperbarui data: ' + (userUpdateError?.message || profileUpdateError?.message));
        } else {
            alert('Data karyawan berhasil diperbarui!');
            setIsEditing(false);
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Memuat data...</div>;
    }

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? 'Edit Data Karyawan' : 'Preview Data Karyawan'}
            </h2>
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg mt-6">
                {/* Form untuk input data */}
                <form id="edit-form" onSubmit={handleUpdate}>
                    {/* Bagian Informasi Utama */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Utama</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">No. Pegawai</label>
                            <input type="text" name="employee_code" value={formData.employee_code} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Departemen</label>
                            <input type="text" name="department" value={formData.department} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jabatan/Posisi</label>
                            <input type="text" name="position" value={formData.position} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                    </div>

                    {/* Bagian Informasi Pribadi */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title/Panggilan</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bahasa</label>
                            <input type="text" name="language" value={formData.language} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                            <input type="text" name="birth_place" value={formData.birth_place} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Negara</label>
                            <input type="text" name="country" value={formData.country} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kewarganegaraan</label>
                            <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status Pernikahan</label>
                            <input type="text" name="marital_status" value={formData.marital_status} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Agama</label>
                            <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                    </div>

                    {/* Bagian Data Lainnya */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Lainnya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Bank</label>
                            <input type="text" name="bank_name" value={formData.bank_name} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
                            <input type="text" name="account_number" value={formData.account_number} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Pemegang Rekening</label>
                            <input type="text" name="account_holder" value={formData.account_holder} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gelar Pendidikan Pertama</label>
                            <input type="text" name="first_degree" value={formData.first_degree} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gelar Pendidikan Kedua</label>
                            <input type="text" name="second_degree" value={formData.second_degree} onChange={handleInputChange} disabled={!isEditing} className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${isEditing ? 'border-gray-300 focus:ring-blue-500' : 'bg-gray-200 border-gray-200'}`} />
                        </div>
                    </div>
                </form>

                {/* Tombol-tombol di luar form */}
                <div className="flex gap-2 mb-4 justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/hr-dashboard/data-karyawan')}
                        className="bg-red-500 text-white px-4 py-2 rounded-2 hover:bg-red-600 transition-colors"
                    >
                        Kembali
                    </button>
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-2 hover:bg-blue-700 transition-colors"
                        >
                            Edit Data
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-4 py-2 rounded-2 hover:bg-green-700 transition-colors"
                        >
                            Simpan Perubahan
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewEditKaryawan;