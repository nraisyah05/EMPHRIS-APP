import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Data dummy untuk payslip.
const DUMMY_PAYSLIPS = [
    { id: '1', month: 'January', year: '2024', file: '/dummy-payslips/payslip-jan-2024.pdf', keterangan: 'Lengkap' },
    { id: '2', month: 'February', year: '2024', file: '/dummy-payslips/payslip-feb-2024.pdf', keterangan: 'Lengkap' },
    { id: '3', month: 'March', year: '2024', file: '/dummy-payslips/payslip-mar-2024.pdf', keterangan: 'Lembur Bulan Ini' },
    { id: '4', month: 'April', year: '2024', file: '/dummy-payslips/payslip-apr-2024.pdf', keterangan: 'Lengkap' },
    { id: '5', month: 'May', year: '2024', file: '/dummy-payslips/payslip-may-2024.pdf', keterangan: 'Lengkap' },
    { id: '6', month: 'June', year: '2024', file: '/dummy-payslips/payslip-jun-2024.pdf', keterangan: 'Lengkap' },
    { id: '7', month: 'July', year: '2024', file: '/dummy-payslips/payslip-jul-2024.pdf', keterangan: 'Bonus Akhir Semester' },
    { id: '8', month: 'August', year: '2024', file: '/dummy-payslips/payslip-aug-2024.pdf', keterangan: 'Lengkap' },
    { id: '9', month: 'September', year: '2024', file: '/dummy-payslips/payslip-sep-2024.pdf', keterangan: 'Lengkap' },
    { id: '10', month: 'October', year: '2024', file: '/dummy-payslips/payslip-oct-2024.pdf', keterangan: 'Lengkap' },
    { id: '11', month: 'November', year: '2024', file: '/dummy-payslips/payslip-nov-2024.pdf', keterangan: 'Lengkap' },
    { id: '12', month: 'December', year: '2024', file: '/dummy-payslips/payslip-dec-2024.pdf', keterangan: 'Tunjangan Akhir Tahun' },
];

// Data dummy untuk info karyawan.
const DUMMY_EMPLOYEE_INFO = {
    name: 'Jane Doe',
    position: 'IT',
    bank: 'Bank BCA',
    accountNumber: '1234567890',
    accountHolder: 'Jane Doe',
};

export default function Payslip() {
    const [payslips, setPayslips] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewFileUrl, setPreviewFileUrl] = useState('');

    // State untuk paginasi
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setPayslips(DUMMY_PAYSLIPS);
        setEmployeeInfo(DUMMY_EMPLOYEE_INFO);
    }, []);

    const months = [...new Set(payslips.map(p => p.month))];
    const years = [...new Set(payslips.map(p => p.year))].sort((a, b) => b - a);

    const filteredPayslips = payslips.filter(p => {
        const monthMatch = selectedMonth === '' || p.month === selectedMonth;
        const yearMatch = selectedYear === '' || p.year === selectedYear;
        return monthMatch && yearMatch;
    });

    // Reset halaman ke 1 setiap kali filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMonth, selectedYear]);

    // Logika Paginasi
    const totalPages = Math.ceil(filteredPayslips.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPayslips = filteredPayslips.slice(startIndex, endIndex);

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

    if (!employeeInfo) {
        return <div className="p-2">Loading...</div>;
    }

    const getInitials = (name) => {
        const parts = name.split(' ');
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
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
            <h2 className="text-xl font-bold mb-4">Payslip Karyawan</h2>
            
            {/* Card Informasi Karyawan */}
            <div className="bg-white shadow-md rounded-xl p-6 border mb-4 flex items-center">
                <div className="flex items-center">
                    <div className="w-35 h-35 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-6xl mr-6">
                        {getInitials(employeeInfo.name)}
                    </div>
                    <div className="grid grid-cols-3 gap-x-50 gap-y-1">
                        <div>
                            <p className="text-gray-500">Nama</p>
                            <p className="font-semibold text-gray-900">{employeeInfo.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Jabatan</p>
                            <p className="font-semibold text-gray-900">{employeeInfo.position}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Bank</p>
                            <p className="font-semibold text-gray-900">{employeeInfo.bank}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">No. Rekening</p>
                            <p className="font-semibold text-gray-900">{employeeInfo.accountNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Nama Pemilik Akun</p>
                            <p className="font-semibold text-gray-900">{employeeInfo.accountHolder}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Konten Utama Payslip */}
            <div className="bg-white shadow-sm rounded-xl p-6 border mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-700">Daftar Payslip</h3>
                    <div className="flex gap-2">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="border p-2 rounded text-sm"
                        >
                            <option value="">Semua Bulan</option>
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="border p-2 rounded text-sm"
                        >
                            <option value="">Semua Tahun</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {filteredPayslips.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Bulan</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Tahun</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Dokumen</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Keterangan</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {currentPayslips.map((payslip, index) => (
                                    <tr 
                                        key={payslip.id}
                                        className={index % 2 === 1 ? 'bg-gray-50' : ''}
                                    >
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">{payslip.month}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{payslip.year}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {`Payslip ${payslip.month} ${payslip.year}`}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-200">{payslip.keterangan}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium border border-gray-200">
                                            <div className="flex justify-left items-center space-x-2">
                                                <button
                                                    onClick={() => handlePreview(payslip.file)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Preview
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(payslip.file)}
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
                    <p className="text-gray-500 italic">Tidak ada payslip yang ditemukan untuk pilihan ini.</p>
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

            {/* Modal untuk Preview Payslip */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h4 className="text-lg font-semibold">Preview Payslip</h4>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-grow p-4 overflow-hidden">
                            <iframe
                                src={previewFileUrl}
                                title="Payslip Preview"
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