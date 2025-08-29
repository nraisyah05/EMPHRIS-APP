import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

const NavLink = ({ to, active, children }) => (
    <Link
        to={to}
        className={`px-4 py-2 font-semibold border-b-2 transition-colors !no-underline ${active
                ? "text-black border-green-600"
                : "text-black border-transparent hover:text-green-600 hover:border-green-600"
            }`}
    >
        {children}
    </Link>
);

export default function PersonalData() {
    const [profile, setProfile] = useState(null);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [attachment, setAttachment] = useState(null);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkSession = async () => {
            // 1. Periksa sesi saat komponen pertama kali dimuat
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                fetchProfile(session.user);
            } else {
                // Jika tidak ada sesi saat halaman dimuat
                setError("Anda belum login. Silakan login terlebih dahulu.");
                setLoading(false);
            }
        };

        checkSession();

        // 2. Tambahkan listener untuk perubahan status auth
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session) {
                    fetchProfile(session.user);
                } else {
                    setError("Anda belum login. Silakan login terlebih dahulu.");
                    setLoading(false);
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchProfile = async (auth_user) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            // 1. Ambil data dari tabel 'users' menggunakan auth.uid()
            //    (auth.uid() adalah UUID dari tabel auth.users)
            const { data: userData, error: fetchUserError } = await supabase
                .from("users")
                .select("id, full_name, employee_code, position, department, email")
                .eq("user_id", auth_user.id) // Menggunakan user_id di sini
                .single();

            if (fetchUserError || !userData) {
                throw new Error("Data pengguna tidak ditemukan di tabel 'users'.");
            }

            // 2. Ambil data dari tabel 'employee_profile' menggunakan id dari tabel 'users'
            const { data: profileData, error: fetchProfileError } = await supabase
                .from("employee_profile")
                .select("*")
                .eq("user_id", userData.id) // Menggunakan id dari userData di sini
                .single();

            if (fetchProfileError || !profileData) {
                throw new Error(
                    "Data profil karyawan tidak ditemukan di tabel 'employee_profile'."
                );
            }

            // Gabungkan data
            const combinedProfile = { ...userData, ...profileData, user_id: auth_user.id };
            setProfile(combinedProfile);
            setFormData(combinedProfile);
        } catch (err) {
            console.error("Kesalahan saat mengambil data:", err.message);
            setError(err.message || "Terjadi kesalahan tak terduga.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!attachment || comment.trim() === "") {
            alert("Harap unggah lampiran dan isi komentar.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Upload file ke Supabase Storage
            const fileExt = attachment.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${formData.user_id}/${fileName}`;
            const { error: uploadError } = await supabase.storage
                .from('employee_attachments')
                .upload(filePath, attachment);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw new Error("Gagal mengunggah lampiran.");
            }

            // Menyimpan permintaan perubahan ke tabel `update_requests`
            const { error: insertError } = await supabase
                .from('update_requests')
                .insert({
                    user_id: formData.user_id,
                    employee_profile_id: formData.id,
                    changes: formData,
                    attachment_url: filePath,
                    comment: comment,
                    status: 'Pending',
                });

            if (insertError) {
                console.error("Insert request error:", insertError);
                throw new Error("Gagal mengirim permintaan pembaruan.");
            }

            setSuccessMessage("Permintaan pembaruan telah dikirim dan akan ditinjau oleh HR.");
            setEditable(false);
            setAttachment(null);
            setComment("");
        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat mengirim permintaan.");
        } finally {
            setLoading(false);
        }
    };

    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(profile);
    const isButtonDisabled = !isFormChanged || !attachment || comment.trim() === "";

    if (loading)
        return <div className="p-4 md:p-8 text-center text-lg">Memuat data...</div>;
    if (error)
        return (
            <div className="p-4 md:p-8 text-center text-lg text-red-600">{error}</div>
        );
    if (!profile)
        return (
            <div className="p-4 md:p-8 text-center text-lg">
                Data profil tidak ditemukan.
            </div>
        );

    return (
        <div className="p-2 md:p-8 min-h-screen">
            <h2 className="text-2xl font-bold mb-2">Profil Karyawan</h2>
            {successMessage && (
                <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md">
                    {successMessage}
                </div>
            )}

            <div className="flex gap-4 border-b border-gray-200 mb-4">
                <NavLink
                    to="/user-dashboard/personal-data"
                    active={location.pathname.endsWith("/user-dashboard/personal-data")}
                >
                    Personal Data
                </NavLink>
                <NavLink
                    to="/user-dashboard/family"
                    active={location.pathname.endsWith("/user-dashboard/family")}
                >
                    Family
                </NavLink>
            </div>

            <div className="bg-white shadow-md rounded-xl border border-gray-200 mb-4">
                <div className="bg-green-600 text-white px-6 py-2 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Kartu Identitas Karyawan</h3>
                    <span className="bg-white text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        Active
                    </span>
                </div>
                <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-20 h-20 sm:w-35 sm:h-35 rounded-full bg-green-500 flex items-center justify-center text-white text-6xl sm:text-6xl font-bold flex-shrink-0">
                        {profile.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm w-full">
                        <div>
                            <p className="text-gray-500">No. Pegawai</p>
                            <p className="font-semibold">{profile.employee_code}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Nama Lengkap</p>
                            <p className="font-semibold">{profile.full_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Departemen</p>
                            <p className="font-semibold">{profile.department}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Jabatan/Posisi</p>
                            <p className="font-semibold">{profile.position}</p>
                        </div>
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 mb-4">
                <h3 className="text-md font-semibold mb-3 text-green-700">
                    Data Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title (Bapak/Ibu)
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name || ""}
                            onChange={handleChange}
                            disabled={true}
                            className={`border p-2 w-full rounded-md text-sm bg-gray-100`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bahasa</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>

                <h3 className="text-md font-semibold mb-3 text-green-700">
                    Data Kelahiran
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Jenis Kelamin
                        </label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tanggal Lahir
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            value={formData.birth_date || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tempat Lahir
                        </label>
                        <input
                            type="text"
                            name="birth_place"
                            value={formData.birth_place || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Negara</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nasionalisme
                        </label>
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>

                <h3 className="text-md font-semibold mb-3 text-green-700">
                    Keluarga & Agama
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Agama</label>
                        <input
                            type="text"
                            name="religion"
                            value={formData.religion || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <input
                            type="text"
                            name="marital_status"
                            value={formData.marital_status || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>

                <h3 className="text-md font-semibold mb-3 text-green-700">
                    Akun Bank
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama Bank</label>
                        <input
                            type="text"
                            name="bank_name"
                            value={formData.bank_name || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nomor Rekening
                        </label>
                        <input
                            type="text"
                            name="account_number"
                            value={formData.account_number || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nama Pemilik Rekening
                        </label>
                        <input
                            type="text"
                            name="account_holder"
                            value={formData.account_holder || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>

                <h3 className="text-md font-semibold mb-3 text-green-700">
                    Pendidikan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Gelar Akademik
                        </label>
                        <input
                            type="text"
                            name="first_degree"
                            value={formData.first_degree || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Gelar Kedua
                        </label>
                        <input
                            type="text"
                            name="second_degree"
                            value={formData.second_degree || ""}
                            onChange={handleChange}
                            disabled={!editable}
                            className={`border p-2 w-full rounded-md text-sm ${!editable ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>
            </div>

            {editable && (
                <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 mb-4">
                    <h3 className="text-md font-semibold mb-3 text-green-700">
                        Lampiran dan Komentar
                    </h3>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                            Unggah Lampiran
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-green-50 file:text-green-700
                                hover:file:bg-green-100"
                        />
                        {attachment && (
                            <p className="mt-1 text-sm text-gray-600">
                                File terpilih: {attachment.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Komentar</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Berikan alasan perubahan data..."
                            rows="3"
                            className="border p-2 w-full rounded-md text-sm"
                        />
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
                {!editable ? (
                    <button
                        className="bg-blue-500 text-white px-10 py-2 rounded-2 font-semibold hover:bg-blue-600 transition-colors"
                        onClick={() => setEditable(true)}
                    >
                        Update
                    </button>
                ) : (
                    <>
                        <button
                            className="bg-gray-500 text-white px-6 py-2 rounded-2 font-semibold hover:bg-gray-600 transition-colors"
                            onClick={() => {
                                setEditable(false);
                                setFormData(profile);
                                setAttachment(null);
                                setComment("");
                            }}
                        >
                            Batal
                        </button>
                        <button
                            className={`px-6 py-2 rounded-2 font-semibold transition-colors ${isButtonDisabled
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                }`}
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                        >
                            Kirim Permintaan
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}