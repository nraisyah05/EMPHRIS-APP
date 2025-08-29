import React, { useState } from 'react';

// Data dummy untuk pegawai
const DUMMY_EMPLOYEES = [
  { employee_code: "EMP-001", full_name: "John Doe" },
  { employee_code: "EMP-002", full_name: "Jane Smith" },
  { employee_code: "EMP-003", full_name: "Peter Parker" },
];

export default function DocumentForm({ onAddDocument }) {
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [file, setFile] = useState(null);

  const handleEmployeeCodeChange = (e) => {
    const code = e.target.value.toUpperCase();
    setEmployeeCode(code);

    // Cari nama pegawai berdasarkan kode
    const employee = DUMMY_EMPLOYEES.find(emp => emp.employee_code === code);
    if (employee) {
      setEmployeeName(employee.full_name);
    } else {
      setEmployeeName('Nama tidak ditemukan');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pastikan file sudah dipilih
    if (!file) {
      alert("Harap pilih file dokumen.");
      return;
    }

    const newDocument = {
      employee_code: employeeCode,
      full_name: employeeName,
      document_name: documentName,
      upload_date: uploadDate,
      file,
      file_name: file.name, // Simpan nama file dari objek File
    };

    onAddDocument(newDocument);

    // Reset form setelah submit
    setEmployeeCode('');
    setEmployeeName('');
    setDocumentName('');
    setUploadDate('');
    setFile(null);
  };

  // Kondisi untuk menonaktifkan tombol submit
  const isFormIncomplete = !employeeCode || employeeName === 'Nama tidak ditemukan' || !documentName || !uploadDate || !file;

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 md:p-6 mb-4">
      <h3 className="text-xl font-semibold mb-4 text-green-700">Form Unggah Dokumen</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">No. Pegawai</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md text-sm"
              value={employeeCode}
              onChange={handleEmployeeCodeChange}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Nama Pegawai</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md text-sm bg-gray-100"
              value={employeeName}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Nama Dokumen</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md text-sm"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Tanggal Unggah</label>
            <input
              type="date"
              className="border p-2 w-full rounded-md text-sm"
              value={uploadDate}
              onChange={(e) => setUploadDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">File Dokumen (PDF)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-2 font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isFormIncomplete}
        >
          Unggah Dokumen
        </button>
      </form>
    </div>
  );
}