import React, { useState } from 'react';

const DUMMY_EMPLOYEES = [
    { employee_code: "EMP-001", full_name: "John Doe" },
    { employee_code: "EMP-002", full_name: "Jane Smith" },
    { employee_code: "EMP-003", full_name: "Peter Parker" },
];

const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const YEARS = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) { // Menampilkan 5 tahun ke belakang
        years.push(i);
    }
    return years;
};

export default function PayslipForm({ onAddPayslip }) {
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

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
        // Cek validasi sudah tidak diperlukan di sini karena tombol sudah disable
        // if (!employeeCode || !employeeName || !month || !year || !file) {
        //     alert("Harap lengkapi semua data.");
        //     return;
        // }

        const newPayslip = {
            employee_code: employeeCode,
            full_name: employeeName,
            month,
            year,
            file,
            description
        };

        onAddPayslip(newPayslip);

        // Reset form
        setEmployeeCode('');
        setEmployeeName('');
        setMonth('');
        setYear('');
        setFile(null);
        setDescription('');
    };

    // Kondisi untuk menonaktifkan tombol submit
    const isFormIncomplete = !employeeCode || employeeName === 'Nama tidak ditemukan' || !month || !year || !file;

    return (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 md:p-6 mb-4">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Form Unggah Payslip</h3>
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
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Bulan</label>
                        <select
                            className="border p-2 w-full rounded-md text-sm"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">Pilih Bulan</option>
                            {MONTHS.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-medium mb-1">Tahun</label>
                        <select
                            className="border p-2 w-full rounded-md text-sm"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">Pilih Tahun</option>
                            {YEARS().map((y, index) => (
                                <option key={index} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4 mb-2">
                    <label className="block text-gray-700 text-sm font-medium mb-1">File Payslip (PDF)</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept=".pdf"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                </div>

                <div className="mt-4 mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-1">Keterangan</label>
                    <textarea
                        className="border p-2 w-full rounded-md text-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-2 font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isFormIncomplete}
                >
                    Unggah Payslip
                </button>
            </form>
        </div>
    );
}