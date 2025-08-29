import React, { useState } from 'react';

// Data dummy untuk payslip
const DUMMY_PAYSLIPS = [
  { id: '1', employee_code: "EMP-001", full_name: "John Doe", month: 'Januari', year: '2024', file_url: '/dummy-payslips/payslip-jan-2024.pdf', description: 'Lengkap' },
  { id: '2', employee_code: "EMP-002", full_name: "Jane Smith", month: 'Januari', year: '2024', file_url: '/dummy-payslips/payslip-jan-2024.pdf', description: 'Lengkap' },
  { id: '3', employee_code: "EMP-001", full_name: "John Doe", month: 'Februari', year: '2024', file_url: '/dummy-payslips/payslip-feb-2024.pdf', description: 'Lembur Bulan Ini' },
  { id: '4', employee_code: "EMP-003", full_name: "Peter Parker", month: 'Februari', year: '2024', file_url: '/dummy-payslips/payslip-feb-2024.pdf', description: 'Lengkap' },
  { id: '5', employee_code: "EMP-001", full_name: "John Doe", month: 'Maret', year: '2024', file_url: '/dummy-payslips/payslip-mar-2024.pdf', description: 'Lengkap' },
  { id: '6', employee_code: "EMP-004", full_name: "Clark Kent", month: 'Maret', year: '2024', file_url: '/dummy-payslips/payslip-mar-2024.pdf', description: 'Lengkap' },
  { id: '7', employee_code: "EMP-005", full_name: "Bruce Wayne", month: 'April', year: '2024', file_url: '/dummy-payslips/payslip-apr-2024.pdf', description: 'Lengkap' },
  { id: '8', employee_code: "EMP-006", full_name: "Tony Stark", month: 'April', year: '2024', file_url: '/dummy-payslips/payslip-apr-2024.pdf', description: 'Lengkap' },
  { id: '9', employee_code: "EMP-007", full_name: "Steve Rogers", month: 'Mei', year: '2024', file_url: '/dummy-payslips/payslip-may-2024.pdf', description: 'Lengkap' },
  { id: '10', employee_code: "EMP-008", full_name: "Diana Prince", month: 'Mei', year: '2024', file_url: '/dummy-payslips/payslip-may-2024.pdf', description: 'Lengkap' },
  { id: '11', employee_code: "EMP-009", full_name: "Barry Allen", month: 'Juni', year: '2024', file_url: '/dummy-payslips/payslip-jun-2024.pdf', description: 'Lengkap' },
  { id: '12', employee_code: "EMP-010", full_name: "Hal Jordan", month: 'Juni', year: '2024', file_url: '/dummy-payslips/payslip-jun-2024.pdf', description: 'Lengkap' },
];

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const YEARS = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 5; i--) {
    years.push(String(i));
  }
  return years;
};

export default function PayslipTable({ onDelete }) {
  const [payslips, setPayslips] = useState(DUMMY_PAYSLIPS);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [payslipsPerPage] = useState(10);

  const handlePreview = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      alert("File tidak tersedia untuk pratinjau.");
    }
  };

  const filteredPayslips = payslips.filter(payslip => {
    const monthMatch = selectedMonth === '' || payslip.month === selectedMonth;
    const yearMatch = selectedYear === '' || payslip.year === selectedYear;
    const searchMatch = searchQuery === '' ||
      payslip.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payslip.employee_code.toLowerCase().includes(searchQuery.toLowerCase());
    return monthMatch && yearMatch && searchMatch;
  });

  // Logika untuk pagination
  const indexOfLastPayslip = currentPage * payslipsPerPage;
  const indexOfFirstPayslip = indexOfLastPayslip - payslipsPerPage;
  const currentPayslips = filteredPayslips.slice(indexOfFirstPayslip, indexOfLastPayslip);

  const totalPages = Math.ceil(filteredPayslips.length / payslipsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mx-1 rounded-full text-sm font-semibold ${currentPage === i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 md:p-6 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold text-green-700">Daftar Payslip Terunggah</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Input Pencarian */}
          <input
            type="text"
            className="border p-2 w-full sm:w-56 rounded-md text-sm"
            placeholder="Cari Nama/No. Pegawai..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
            }}
          />
          {/* Filter Bulan */}
          <select
            className="border p-2 w-full sm:w-auto rounded-md text-sm"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
            }}
          >
            <option value="">Semua Bulan</option>
            {MONTHS.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>

          {/* Filter Tahun */}
          <select
            className="border p-2 w-full sm:w-auto rounded-md text-sm"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1); // Reset halaman ke 1 saat filter berubah
            }}
          >
            <option value="">Semua Tahun</option>
            {YEARS().map((y, index) => (
              <option key={index} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">No</th>
              <th className="py-3 px-6 text-left">No. Pegawai</th>
              <th className="py-3 px-6 text-left">Nama Pegawai</th>
              <th className="py-3 px-6 text-left">Bulan</th>
              <th className="py-3 px-6 text-left">Tahun</th>
              <th className="py-3 px-6 text-left">Keterangan</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentPayslips.length > 0 ? (
              currentPayslips.map((payslip, index) => (
                <tr
                  key={payslip.id}
                  className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap">{payslip.id}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{payslip.employee_code}</td>
                  <td className="py-3 px-6 text-left">{payslip.full_name}</td>
                  <td className="py-3 px-6 text-left">{payslip.month}</td>
                  <td className="py-3 px-6 text-left">{payslip.year}</td>
                  <td className="py-3 px-6 text-left">{payslip.description}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handlePreview(payslip.file_url)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-2 text-xs font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => onDelete(payslip.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-2 text-xs font-semibold hover:bg-red-600 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  Tidak ada payslip yang diunggah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Kontrol Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-2 text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="mx-2">{renderPaginationButtons()}</div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-2 text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}