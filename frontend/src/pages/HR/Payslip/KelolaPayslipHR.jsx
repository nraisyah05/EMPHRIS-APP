import React, { useState } from 'react';
import PayslipForm from './PayslipForm';
import PayslipTable from './PayslipTable';

export default function KelolaPayslipHR() {
  const [showForm, setShowForm] = useState(false);
  const [payslips, setPayslips] = useState([
    // Contoh data dummy untuk tabel
    {
      id: 1,
      employee_code: "EMP-001",
      full_name: "John Doe",
      month: "Januari",
      year: 2025,
      file_url: "/path/to/payslip_jan_2025.pdf", // Tambahkan URL file dummy
      description: "Overtime 2 hari"
    },
    {
      id: 2,
      employee_code: "EMP-002",
      full_name: "Jane Smith",
      month: "Januari",
      year: 2025,
      file_url: "/path/to/payslip_jan_2025.pdf", // Tambahkan URL file dummy
      description: "Cuti 1 hari"
    },
  ]);

  const handleAddPayslip = (newPayslip) => {
    setPayslips([...payslips, { ...newPayslip, id: Date.now() }]);
    setShowForm(false);
  };

  const handleDeletePayslip = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus payslip ini?")) {
      setPayslips(payslips.filter(payslip => payslip.id !== id));
    }
  };

  return (
    <div className="p-2 md:p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Kelola Payslip Karyawan</h2>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-2 font-semibold hover:bg-green-600 transition-colors"
        >
          Tambah Payslip
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-2 font-semibold hover:bg-gray-600 transition-colors"
        >
          Lihat Daftar Payslip
        </button>
      </div>

      {showForm ? (
        <PayslipForm onAddPayslip={handleAddPayslip} />
      ) : (
        <PayslipTable payslips={payslips} onDelete={handleDeletePayslip} />
      )}
    </div>
  );
}