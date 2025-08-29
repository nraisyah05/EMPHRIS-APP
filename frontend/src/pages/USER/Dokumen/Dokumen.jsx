import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Data dummy untuk dokumen
const DUMMY_DOCUMENTS = [
    { id: '1', name: 'Surat Kontrak Kerja', uploadDate: '2024-01-15', fileName: 'kontrak_kerja_jane_doe.pdf', file: '/dummy-docs/kontrak_kerja.pdf' },
    { id: '2', name: 'Formulir Pajak (SPT 1770)', uploadDate: '2024-03-20', fileName: 'spt_1770_2023.pdf', file: '/dummy-docs/spt_1770.pdf' },
    { id: '3', name: 'SK Kenaikan Jabatan', uploadDate: '2024-05-10', fileName: 'sk_kenaikan_jabatan_it.pdf', file: '/dummy-docs/sk_kenaikan_jabatan.pdf' },
    { id: '4', name: 'Peraturan Perusahaan', uploadDate: '2023-11-01', fileName: 'peraturan_perusahaan_2023.pdf', file: '/dummy-docs/peraturan_perusahaan.pdf' },
    { id: '5', name: 'Surat Peringatan (SP)', uploadDate: '2024-07-22', fileName: 'sp_1_jane_doe.pdf', file: '/dummy-docs/sp_1.pdf' },
    { id: '6', name: 'Surat Cuti Tahunan', uploadDate: '2024-06-18', fileName: 'surat_cuti_tahunan.pdf', file: '/dummy-docs/surat_cuti_tahunan.pdf' },
    { id: '7', name: 'Sertifikat Pelatihan Web Dev', uploadDate: '2024-04-05', fileName: 'sertifikat_webdev.pdf', file: '/dummy-docs/sertifikat_webdev.pdf' },
    { id: '8', name: 'Data Absensi Januari 2024', uploadDate: '2024-02-01', fileName: 'absensi_jan_2024.xlsx', file: '/dummy-docs/absensi_jan_2024.xlsx' },
    { id: '9', name: 'Dokumen BPJS Ketenagakerjaan', uploadDate: '2024-01-10', fileName: 'bpjs_ketenagakerjaan.pdf', file: '/dummy-docs/bpjs_ketenagakerjaan.pdf' },
    { id: '10', name: 'Dokumen BPJS Kesehatan', uploadDate: '2024-01-10', fileName: 'bpjs_kesehatan.pdf', file: '/dummy-docs/bpjs_kesehatan.pdf' },
    { id: '11', name: 'Laporan Kinerja Q2 2024', uploadDate: '2024-07-05', fileName: 'laporan_kinerja_q2.docx', file: '/dummy-docs/laporan_kinerja_q2.docx' },
    { id: '12', name: 'Surat Perjanjian Rahasia (NDA)', uploadDate: '2024-01-15', fileName: 'nda_jane_doe.pdf', file: '/dummy-docs/nda.pdf' },
    { id: '13', name: 'Formulir Pengajuan Lembur', uploadDate: '2024-03-28', fileName: 'form_lembur_maret.pdf', file: '/dummy-docs/form_lembur.pdf' },
    { id: '14', name: 'Panduan Keamanan IT', uploadDate: '2023-10-25', fileName: 'panduan_keamanan_it.pdf', file: '/dummy-docs/panduan_keamanan_it.pdf' },
    { id: '15', name: 'Surat Pemberitahuan Gaji Baru', uploadDate: '2024-07-01', fileName: 'pemberitahuan_gaji_juli.pdf', file: '/dummy-docs/pemberitahuan_gaji_baru.pdf' },
];

export default function Documents() {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewFileUrl, setPreviewFileUrl] = useState('');
    const location = useLocation();

    // State untuk paginasi
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setDocuments(DUMMY_DOCUMENTS);
        // Reset halaman ke 1 saat pencarian berubah
        setCurrentPage(1); 
    }, [searchTerm]);

    // Filter dokumen berdasarkan pencarian
    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hitung total halaman dan item yang akan ditampilkan
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

    const handlePreview = (fileUrl) => {
        setPreviewFileUrl(fileUrl);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPreviewFileUrl('');
    };

    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileUrl.split('/').pop());
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Fungsi baru untuk merender tombol angka paginasi
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 mx-1 rounded-full text-sm font-semibold transition-colors ${
                        currentPage === i ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold mb-4">Dokumen Karyawan</h2>

            {/* Konten Utama Dokumen */}
            <div className="bg-white shadow-sm rounded-xl p-6 border mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-700">Daftar Dokumen</h3>
                    <div className="flex gap-2">
                        {/* Kolom Pencarian */}
                        <input
                            type="text"
                            placeholder="Cari dokumen..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 rounded text-sm w-full max-w-xs"
                        />
                    </div>
                </div>

                {filteredDocuments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">No</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Nama Dokumen</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Tanggal Upload</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Nama File</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {currentDocuments.map((doc, index) => (
                                    <tr 
                                        key={doc.id}
                                        className={index % 2 === 1 ? 'bg-gray-50' : ''}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">{startIndex + index + 1}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{doc.name}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{doc.uploadDate}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{doc.fileName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium border border-gray-200">
                                            <div className="flex justify-left items-center space-x-2">
                                                <button
                                                    onClick={() => handlePreview(doc.file)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Preview
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(doc.file)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Download
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">Tidak ada dokumen yang ditemukan.</p>
                )}

                {/* Kontrol Paginasi */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        
                        <div className="mx-2 flex gap-2">
                            {renderPageNumbers()}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Modal untuk Preview Dokumen */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h4 className="text-lg font-semibold">Preview Dokumen</h4>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow p-4 overflow-hidden">
                            <iframe
                                src={previewFileUrl}
                                title="Document Preview"
                                className="w-full h-full border-none"
                            ></iframe>
                        </div>
                        <div className="p-4 border-t flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}