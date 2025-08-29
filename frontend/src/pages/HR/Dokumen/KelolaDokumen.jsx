import React, { useState } from 'react';
import DocumentForm from './DocumentForm';
import DocumentTable from './DocumentTable';

export default function KelolaDokumen() {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState([
    // Contoh data dummy untuk tabel dokumen
    {
      id: 1,
      employee_code: "EMP-001",
      document_name: "Surat Edaran Lebaran",
      upload_date: "2025-03-20",
      file: null, // Di frontend, file object akan disimpan di sini
      file_name: "Surat_Edaran_Lebaran.pdf"
    },
    {
      id: 2,
      employee_code: "EMP-002",
      document_name: "Kebijakan Cuti Karyawan",
      upload_date: "2025-01-15",
      file: null,
      file_name: "Kebijakan_Cuti_2025.pdf"
    },
  ]);

  const handleAddDocument = (newDocument) => {
    setDocuments(prevDocs => [...prevDocs, { ...newDocument, id: Date.now() }]);
    setShowForm(false);
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="p-2 md:p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Kelola Dokumen</h2>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-2 font-semibold hover:bg-green-600 transition-colors"
        >
          Tambah Dokumen
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-2 font-semibold hover:bg-gray-600 transition-colors"
        >
          Lihat Daftar Dokumen
        </button>
      </div>

      {showForm ? (
        <DocumentForm onAddDocument={handleAddDocument} />
      ) : (
        <DocumentTable documents={documents} onDelete={handleDeleteDocument} />
      )}
    </div>
  );
}