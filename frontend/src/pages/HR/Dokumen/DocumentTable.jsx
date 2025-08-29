import React, { useState, useEffect } from 'react';

export default function DocumentTable({ documents, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Daftar bulan dalam bahasa Indonesia
  const months = [
    { value: '', label: 'Semua Bulan' },
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  const handlePreview = (file) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, '_blank');
    } else {
      alert("File tidak tersedia untuk pratinjau.");
    }
  };

  // Mendapatkan daftar tahun unik dari data dokumen
  const availableYears = [...new Set(documents.map(doc => doc.upload_date?.substring(0, 4)))].sort((a, b) => b - a);
  const years = ['', ...availableYears];

  const filteredDocuments = documents.filter(doc => {
    const employeeCodeMatch = doc.employee_code?.toLowerCase().includes(searchTerm.toLowerCase());
    const documentNameMatch = doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Logika filter baru untuk tahun dan bulan
    const docYear = doc.upload_date?.substring(0, 4);
    const docMonth = doc.upload_date?.substring(5, 7);

    const yearMatch = !selectedYear || docYear === selectedYear;
    const monthMatch = !selectedMonth || docMonth === selectedMonth;

    return (employeeCodeMatch || documentNameMatch) && yearMatch && monthMatch;
  });

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // Reset halaman ke 1 setiap kali filter berubah
    setCurrentPage(1);
  }, [searchTerm, selectedYear, selectedMonth]);

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mx-1 rounded-full text-sm font-semibold ${
            currentPage === i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <h3 className="text-xl font-semibold text-green-700 mb-2 md:mb-0">Daftar Dokumen Terunggah</h3>
        
        <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari No. Pegawai/Nama Dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full md:w-32 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="">Semua Tahun</option>
            {years.filter(Boolean).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full md:w-32 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
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
              <th className="py-3 px-6 text-left">Nama Dokumen</th>
              <th className="py-3 px-6 text-left">Tanggal Unggah</th>
              <th className="py-3 px-6 text-left">Nama File</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentDocuments.length > 0 ? (
              currentDocuments.map((doc, index) => (
                <tr
                  key={doc.id}
                  className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {indexOfFirstDocument + index + 1}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{doc.employee_code}</td>
                  <td className="py-3 px-6 text-left">{doc.document_name}</td>
                  <td className="py-3 px-6 text-left">{doc.upload_date}</td>
                  <td className="py-3 px-6 text-left">{doc.file_name}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handlePreview(doc.file)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-2 text-xs font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => onDelete(doc.id)}
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
                  {searchTerm || selectedYear || selectedMonth ? "Tidak ada dokumen yang cocok dengan filter." : "Tidak ada dokumen yang diunggah."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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