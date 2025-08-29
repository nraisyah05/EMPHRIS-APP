import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';

const FormKaryawan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [employeeProfile, setEmployeeProfile] = useState({
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

    const [userData, setUserData] = useState(
        location.state?.newUserData || {
            user_id: null,
            employee_code: '',
            full_name: '',
            email: '',
            department: '',
            position: '',
            company: '',
            role: '',
        }
    );

    const [isEditMode, setIsEditMode] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(true);

    const validateForm = () => {
        const requiredProfileFields = [
            'title', 'language', 'gender', 'birth_date', 'birth_place',
            'country', 'nationality', 'marital_status', 'religion',
            'account_holder', 'bank_name', 'account_number', 'first_degree'
        ];
        const requiredUserFields = ['employee_code', 'full_name', 'email', 'department', 'position', 'company', 'role'];

        const isProfileValid = requiredProfileFields.every(field => employeeProfile[field]);
        const isUserValid = requiredUserFields.every(field => userData[field]);

        return isProfileValid && isUserValid;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);

            const newUserDataFromState = location.state?.newUserData;

            // Prioritaskan data dari state navigasi jika ada
            if (newUserDataFromState) {
                setUserId(newUserDataFromState.user_id);
                setUserData(newUserDataFromState);
                setIsEditMode(false); // Mode tambah data
                setLoading(false);
                return;
            }

            // Fallback: Ambil data dari sesi pengguna yang sedang aktif
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !session) {
                console.error('No active session found:', sessionError?.message);
                navigate('/login');
                return;
            }

            const currentUserId = session.user.id;
            setUserId(currentUserId);

            // Ambil data profil pengguna dari tabel 'users'
            const { data: userProfile, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', currentUserId) // 👈 PERBAIKAN: Gunakan 'id' bukan 'user_id'
                .single();

            if (userError && userError.code !== 'PGRST116') {
                console.error('Error fetching user data:', userError.message);
                alert('Error fetching user data.');
            }

            if (userProfile) {
                setUserData(userProfile);
            }

            // Ambil data profil karyawan dari tabel 'employee_profile'
            const { data: employeeData, error: employeeError } = await supabase
                .from('employee_profile')
                .select('*')
                .eq('user_id', currentUserId)
                .single();

            if (employeeData) {
                setEmployeeProfile(employeeData);
                setIsEditMode(true); // Mode edit
            } else {
                setIsEditMode(false); // Mode tambah data
            }

            setLoading(false);
        };

        fetchUserData();
    }, [navigate, location.state]);

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [employeeProfile, userData]);

    const handleProfileChange = (e) => {
        setEmployeeProfile({
            ...employeeProfile,
            [e.target.name]: e.target.value
        });
    };

    const handleUserChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!isFormValid) {
            alert("Harap lengkapi semua field yang wajib diisi.");
            setLoading(false);
            return;
        }

        if (!userId) {
            alert("User ID tidak ditemukan. Harap login kembali.");
            setLoading(false);
            return;
        }

        const dataToSubmitProfile = { ...employeeProfile, user_id: userId };
        const dataToSubmitUser = { ...userData, id: userId };

        try {
            if (isEditMode) {
                // Mode EDIT: Perbarui data di kedua tabel
                // ... (Kode ini sudah benar dan tidak perlu diubah)
                const { error: userUpdateError } = await supabase
                    .from('users')
                    .update(dataToSubmitUser)
                    .eq('id', userId);

                if (userUpdateError) throw userUpdateError;

                const { error: profileUpdateError } = await supabase
                    .from('employee_profile')
                    .update(dataToSubmitProfile)
                    .eq('user_id', userId);

                if (profileUpdateError) throw profileUpdateError;

                alert('Data karyawan berhasil diperbarui!');
            } else {
                // --- PERBAIKAN UTAMA DI SINI ---
                // Mode TAMBAH: Lakukan INSERT data di tabel 'users'
                // lalu INSERT data di tabel 'employee_profile'

                // 1. Masukkan data ke tabel 'users' terlebih dahulu
                // Gunakan `upsert` untuk memastikan data masuk (jika belum ada) atau diperbarui
                const { error: userInsertError } = await supabase
                    .from('users')
                    .upsert([dataToSubmitUser]); // Gunakan upsert untuk mencegah error jika baris sudah ada

                if (userInsertError) {
                    console.error('Error inserting into users:', userInsertError.message);
                    throw userInsertError;
                }

                // 2. Masukkan data ke tabel 'employee_profile'
                // Langkah ini sekarang akan berhasil karena user_id sudah ada di tabel users
                const { error: profileInsertError } = await supabase
                    .from('employee_profile')
                    .insert([dataToSubmitProfile]);

                if (profileInsertError) {
                    console.error('Error inserting into employee_profile:', profileInsertError.message);
                    throw profileInsertError;
                }

                alert('Data pegawai baru berhasil ditambahkan!');
            }

            navigate('/hr-dashboard/data-karyawan');
        } catch (error) {
            console.error('Error in handleSubmit:', error.message);
            alert('Gagal menyimpan data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-2 text-center">Loading...</div>;
    }

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? 'Edit Data Karyawan' : 'Tambah Data Pegawai Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 mt-6 rounded-lg shadow-md space-y-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Informasi Karyawan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">No. Pegawai</label>
                        <input type="text" name="employee_code" value={userData.employee_code} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Nama Lengkap</label>
                        <input type="text" name="full_name" value={userData.full_name} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" value={userData.email} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Departemen</label>
                        <input type="text" name="department" value={userData.department} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Jabatan</label>
                        <input type="text" name="position" value={userData.position} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Perusahaan</label>
                        <input type="text" name="company" value={userData.company} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-gray-700">Role</label>
                        <input type="text" name="role" value={userData.role} onChange={handleUserChange} className="mt-1 block w-full p-2 border rounded-md" required />
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Data Pribadi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Gelar</label>
                            <select name="title" value={employeeProfile.title} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required>
                                <option value="">Pilih Gelar</option>
                                <option value="Bapak">Bapak</option>
                                <option value="Ibu">Ibu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Bahasa</label>
                            <select name="language" value={employeeProfile.language} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required>
                                <option value="">Pilih Bahasa</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="English">English</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Jenis Kelamin</label>
                            <select name="gender" value={employeeProfile.gender} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Data Kelahiran</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Tanggal Lahir</label>
                            <input type="date" name="birth_date" value={employeeProfile.birth_date} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Tempat Lahir</label>
                            <input type="text" name="birth_place" value={employeeProfile.birth_place} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Negara</label>
                            <input type="text" name="country" value={employeeProfile.country} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Nasionalisme</label>
                            <input type="text" name="nationality" value={employeeProfile.nationality} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Keluarga & Agama</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Status Pernikahan</label>
                            <select name="marital_status" value={employeeProfile.marital_status} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required>
                                <option value="">Pilih Status</option>
                                <option value="Menikah">Menikah</option>
                                <option value="Single">Single</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Agama</label>
                            <input type="text" name="religion" value={employeeProfile.religion} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Akun Bank</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Nama Pemilik Akun</label>
                            <input type="text" name="account_holder" value={employeeProfile.account_holder} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Nama Bank</label>
                            <select
                                name="bank_name"
                                value={employeeProfile.bank_name}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            >
                                <option value="">Pilih Bank</option>
                                <option value="BCA">BCA</option>
                                <option value="Mandiri">Mandiri</option>
                                <option value="BNI">BNI</option>
                                <option value="BRI">BRI</option>
                                <option value="Bank Syariah Indonesia">Bank Syariah Indonesia</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">No. Rekening</label>
                            <input type="text" name="account_number" value={employeeProfile.account_number} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4">Pendidikan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Gelar Akademik</label>
                            <input type="text" name="first_degree" value={employeeProfile.first_degree} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-gray-700">Gelar Kedua</label>
                            <input type="text" name="second_degree" value={employeeProfile.second_degree} onChange={handleProfileChange} className="mt-1 block w-full p-2 border rounded-md" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate('/hr-dashboard/data-karyawan')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-2 hover:bg-gray-600"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`text-white px-4 py-2 rounded-2 ${isFormValid && !loading ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        {loading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambah Data Pegawai Baru')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormKaryawan;