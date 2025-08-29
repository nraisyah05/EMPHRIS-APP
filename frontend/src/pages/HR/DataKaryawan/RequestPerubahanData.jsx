import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const RequestPerubahanData = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            // Langkah 1: Ambil data permintaan tanpa join
            const { data: requestsData, error: requestsError } = await supabase
                .from("update_requests")
                .select(`*`)
                .order("created_at", { ascending: false });

            if (requestsError) {
                throw requestsError;
            }

            if (!requestsData || requestsData.length === 0) {
                setRequests([]);
                setLoading(false);
                return;
            }

            // Ambil semua user_id unik dari data permintaan
            const userIds = requestsData.map((request) => request.user_id);

            // Langkah 2: Ambil data pengguna dari tabel auth.users
            const { data: usersData, error: usersError } = await supabase
                .from("users") // Menggunakan nama "users" karena Supabase mengenali alias ini untuk auth.users
                .select("id, employee_code, full_name")
                .in("id", userIds); // Menggunakan filter IN untuk mengambil hanya pengguna yang relevan

            if (usersError) {
                throw usersError;
            }

            // Langkah 3: Gabungkan kedua data
            const usersMap = new Map(usersData.map(user => [user.id, user]));

            const combinedData = requestsData.map(request => {
                const user = usersMap.get(request.user_id);
                return {
                    ...request,
                    users: user // Menambahkan data user ke setiap request
                };
            });

            setRequests(combinedData);

        } catch (err) {
            console.error("Kesalahan saat mengambil data permintaan:", err.message);
            setError("Gagal mengambil data permintaan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (request) => {
        try {
            const { data: updatedProfile, error: profileError } = await supabase
                .from("employee_profile")
                .update(request.changes)
                .eq("id", request.employee_profile_id);

            if (profileError) throw profileError;

            const { data: updatedRequest, error: requestError } = await supabase
                .from("update_requests")
                .update({ status: "Approved" })
                .eq("id", request.id);

            if (requestError) throw requestError;

            alert("Permintaan berhasil disetujui dan profil telah diperbarui.");
            setExpandedRow(null);
            fetchRequests();
        } catch (err) {
            console.error("Gagal menyetujui permintaan:", err.message);
            alert("Gagal menyetujui permintaan. Silakan coba lagi.");
        }
    };

    const handleReject = async (request) => {
        try {
            const { data, error } = await supabase
                .from("update_requests")
                .update({ status: "Rejected" })
                .eq("id", request.id);

            if (error) throw error;

            alert("Permintaan berhasil ditolak.");
            setExpandedRow(null);
            fetchRequests();
        } catch (err) {
            console.error("Gagal menolak permintaan:", err.message);
            alert("Gagal menolak permintaan. Silakan coba lagi.");
        }
    };

    const toggleRow = (requestId) => {
        setExpandedRow(expandedRow === requestId ? null : requestId);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Memuat permintaan...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Terjadi kesalahan: {error}</div>;

    return (
        <div className="p-2 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Permintaan Perubahan Data</h2>

            {requests.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
                    <p>Tidak ada permintaan perubahan data.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">No. Pegawai</th>
                                <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Nama Pegawai</th>
                                <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Tanggal</th>
                                <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Status</th>
                                <th className="py-3 px-6 text-left text-sm text-gray-600 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((request) => (
                                <React.Fragment key={request.id}>
                                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {request.users ? request.users.employee_code : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {request.users ? request.users.full_name : 'N/A'}
                                        </td>
                                        {/* Akhir perubahan */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => toggleRow(request.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                {expandedRow === request.id ? 'Tutup Detail' : 'Tinjau Data'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRow === request.id && (
                                        <tr>
                                            <td colSpan="5" className="p-4 bg-gray-50 border-t border-gray-200">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">Komentar:</h4>
                                                        <p className="text-gray-600">{request.comment}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800">Perubahan yang Diminta:</h4>
                                                        <ul className="list-disc list-inside text-gray-600">
                                                            {Object.entries(request.changes).map(([key, value]) => (
                                                                <li key={key}>
                                                                    <span className="font-semibold">{key.replace(/_/g, ' ').toUpperCase()}</span>: {value}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {request.attachment_url && (
                                                        <div>
                                                            <a href={request.attachment_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                Lihat Lampiran
                                                            </a>
                                                        </div>
                                                    )}
                                                    {request.status === "Pending" && (
                                                        <div className="mt-4 flex space-x-2">
                                                            <button
                                                                onClick={() => handleApprove(request)}
                                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                                            >
                                                                Setujui
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(request)}
                                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                                            >
                                                                Tolak
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RequestPerubahanData;