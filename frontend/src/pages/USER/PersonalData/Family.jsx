import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, active, children }) => (
    <Link
        to={to}
        // Menambahkan kelas `!text-green-600` dan `!text-gray-500`
        className={`px-4 py-2 font-semibold border-b-2 transition-colors !no-underline ${active
            ? "text-black border-green-600"
            : "text-black border-transparent hover:text-green-600 hover:border-green-600"
            }`}
    >
        {children}
    </Link>
);

// Data dummy untuk profil karyawan
const DUMMY_PROFILE = {
    id: "1b9a5f6f-a989-4c39-a96c-2987b3a9a42d",
    user_id: "4a655af6-abb6-40bf-a58d-e535e5e3994b",
    title: "Ibu",
    language: "Indonesia",
    gender: "Perempuan",
    birth_date: "2005-10-11",
    birth_place: "Pekanbaru",
    country: "Indonesia",
    nationality: "Indonesia",
    religion: "Islam",
    marital_status: "Single",
    academic_title: "S.Tr.Kom",
    second_title: null,
    department: "ICT",
    position: "IT",
    employee_code: "EMP-001",
    full_name: "John Doe",
    email: "johndoe@example.com",
    bank_name: "BCA",
    account_number: "1234567890",
    account_holder: "John Doe",
};

// Data dummy untuk data keluarga
const DUMMY_FAMILY = {
    id: "4a655af6-abb6-40bf-a58d-e535e5e3994b",
    full_name: "John Doe",
    employee_code: "EMP-001",
    department: "ICT",
    position: "IT",
    family: [
        {
            id: "f1",
            name: "Jane Doe",
            relationship: "Istri",
            phone: "081234567890",
            address: "Jl. Merdeka No. 10, Pekanbaru",
        },
        {
            id: "f2",
            name: "Jhonny Doe",
            relationship: "Anak",
            phone: "089876543210",
            address: "Jl. Merdeka No. 10, Pekanbaru",
        },
    ],
};

export default function Family() {
    const [profile, setProfile] = useState(null);
    const [familyData, setFamilyData] = useState([]);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attachment, setAttachment] = useState(null);
    const [comment, setComment] = useState("");
    const location = useLocation();

    useEffect(() => {
        fetchFamilyData();
    }, []);

    async function fetchFamilyData() {
        setLoading(true);
        try {
            const storedFamily = localStorage.getItem("userFamily");
            const storedProfile = localStorage.getItem("userProfile");

            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            } else {
                localStorage.setItem("userProfile", JSON.stringify(DUMMY_PROFILE));
                setProfile(DUMMY_PROFILE);
            }

            if (storedFamily) {
                const parsedFamily = JSON.parse(storedFamily);
                setFamilyData(parsedFamily.family);
                setFormData(parsedFamily.family);
            } else {
                localStorage.setItem("userFamily", JSON.stringify(DUMMY_FAMILY));
                setFamilyData(DUMMY_FAMILY.family);
                setFormData(DUMMY_FAMILY.family);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e, index) => {
        const newFormData = [...formData];
        newFormData[index][e.target.name] = e.target.value;
        setFormData(newFormData);
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!attachment || comment.trim() === "") {
            alert("Harap unggah lampiran dan isi komentar.");
            return;
        }

        // --- Perubahan dimulai dari sini ---
        // Validasi setiap anggota keluarga di formData
        for (const member of formData) {
            if (!member.name.trim() || !member.relationship.trim() || !member.phone.trim() || !member.address.trim()) {
                alert("Harap lengkapi semua data untuk setiap anggota keluarga.");
                return;
            }
        }
        // --- Perubahan berakhir di sini ---

        const dataToSave = { ...DUMMY_FAMILY, family: formData };
        localStorage.setItem("userFamily", JSON.stringify(dataToSave));
        setFamilyData(formData);
        setEditable(false);
        setAttachment(null);
        setComment("");
        alert("Permintaan pembaruan telah dikirim, menunggu persetujuan HR.");
    };

    const handleAddMember = () => {
        setFormData([
            ...formData,
            {
                id: `f${Date.now()}`,
                name: "",
                relationship: "",
                phone: "",
                address: "",
            },
        ]);
    };

    const handleRemoveMember = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };

    if (loading) return <div className="p-2">Memuat data...</div>;
    if (!profile) return <div className="p-2">Data profil tidak ditemukan.</div>;

    // Perbaikan logika isFormChanged
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(familyData);
    const isButtonDisabled = !isFormChanged || !attachment || comment.trim() === "";

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-2">Profil Karyawan</h2>
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

            <div className="w-full bg-white shadow-md rounded-xl border mb-4">
                <div className="bg-green-600 text-white px-6 py-2 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-semibold">Kartu Identitas Karyawan</h3>
                    <span className="bg-white text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        Active
                    </span>
                </div>
                <div className="p-4 flex items-center gap-4">
                    <div className="w-40 h-35 rounded-full bg-green-500 flex items-center justify-center text-white text-6xl font-bold">
                        {profile.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </div>
                    <div className="grid grid-cols-3 gap-x-8 text-sm w-full">
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
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6 border mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-green-700">Data Keluarga</h3>
                    {editable && (
                        <button
                            onClick={handleAddMember}
                            className="bg-green-500 text-white px-3 py-1 rounded-2 text-sm font-semibold"
                        >
                            Tambah Anggota
                        </button>
                    )}
                </div>

                {formData.length > 0 ? (
                    formData.map((member, index) => (
                        <div key={member.id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-md text-gray-800">Anggota #{index + 1}</h4>
                                {editable && (
                                    <button
                                        onClick={() => handleRemoveMember(index)}
                                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={member.name || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!editable}
                                        className={`border p-2 w-full rounded ${!editable ? "bg-gray-100" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hubungan</label>
                                    <input
                                        type="text"
                                        name="relationship"
                                        value={member.relationship || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!editable}
                                        className={`border p-2 w-full rounded ${!editable ? "bg-gray-100" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={member.phone || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!editable}
                                        className={`border p-2 w-full rounded ${!editable ? "bg-gray-100" : ""}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Alamat</label>
                                    <textarea
                                        name="address"
                                        value={member.address || ""}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!editable}
                                        rows="2"
                                        className={`border p-2 w-full rounded ${!editable ? "bg-gray-100" : ""}`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">Tidak ada data keluarga yang ditemukan.</p>
                )}
            </div>

            {editable && (
                <div className="bg-white shadow-sm rounded-xl p-6 border mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-green-700">Lampiran dan Komentar</h3>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Unggah Lampiran</label>
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
                            <p className="mt-2 text-sm text-gray-600">File terpilih: {attachment.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Komentar</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Berikan alasan perubahan data..."
                            rows="3"
                            className="border p-2 w-full rounded"
                        />
                    </div>
                </div>
            )}

            <div className="mt-4 flex justify-end gap-2">
                {!editable ? (
                    <button
                        className="bg-blue-500 text-white px-10 py-2 rounded"
                        onClick={() => setEditable(true)}
                    >
                        Update
                    </button>
                ) : (
                    <>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-2"
                            onClick={() => {
                                setEditable(false);
                                setFormData(familyData);
                                setAttachment(null);
                                setComment("");
                            }}
                        >
                            Batal
                        </button>
                        <button
                            className={`px-4 py-2 rounded-2 ${isButtonDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-green-500 text-white"
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