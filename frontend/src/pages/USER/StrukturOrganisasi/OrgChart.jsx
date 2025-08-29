import React, { useState, useEffect, useRef } from 'react';

// Data dummy yang sudah diperbarui dengan email dan foto
const DUMMY_EMPLOYEES = [
    // General Manager (level tertinggi)
    { id: 100, noPegawai: 'GM-01', nama: 'Ibu Ratna Sari', posisiId: 'GM', posisi: 'General Manager', atasanId: null, bawahanIds: [1, 9, 13, 16], perusahaan: 'PT. Teknologi Maju', departemen: 'Pimpinan', email: 'ratna.sari@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Bertanggung jawab atas seluruh operasional dan strategi perusahaan.' },
    
    // IT Department
    { id: 1, noPegawai: 'P001', nama: 'Budi Santoso', posisiId: 'IT-DIR-01', posisi: 'IT Director', atasanId: 100, bawahanIds: [2, 3, 4], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'budi.santoso@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Memimpin departemen IT, merencanakan dan mengelola infrastruktur teknologi.' },
    { id: 2, noPegawai: 'P002', nama: 'Siti Aminah', posisiId: 'IT-MGR-01', posisi: 'IT Manager', atasanId: 1, bawahanIds: [5, 6], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'siti.aminah@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengelola tim IT sehari-hari dan memastikan kelancaran proyek.' },
    { id: 3, noPegawai: 'P003', nama: 'Joko Susilo', posisiId: 'IT-DEV-01', posisi: 'Senior Developer', atasanId: 1, bawahanIds: [7], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'joko.susilo@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Merancang dan mengembangkan aplikasi tingkat lanjut.' },
    { id: 4, noPegawai: 'P004', nama: 'Dewi Lestari', posisiId: 'IT-QA-01', posisi: 'QA Lead', atasanId: 1, bawahanIds: [8], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'dewi.lestari@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Memimpin tim quality assurance dan memastikan kualitas produk.' },
    { id: 5, noPegawai: 'P005', nama: 'Rudi Permana', posisiId: 'IT-DEV-02', posisi: 'Mid-Level Developer', atasanId: 2, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'rudi.permana@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Berkontribusi dalam pengembangan dan pemeliharaan aplikasi.' },
    { id: 6, noPegawai: 'P006', nama: 'Lisa Mariska', posisiId: 'IT-SUP-01', posisi: 'IT Support', atasanId: 2, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'lisa.mariska@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Memberikan dukungan teknis dan pemecahan masalah kepada pengguna.' },
    { id: 7, noPegawai: 'P007', nama: 'Angga Wijaya', posisiId: 'IT-DEV-03', posisi: 'Junior Developer', atasanId: 3, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'angga.wijaya@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Membantu tim dalam menulis dan menguji kode.' },
    { id: 8, noPegawai: 'P008', nama: 'Putri Rahayu', posisiId: 'IT-QA-02', posisi: 'QA Tester', atasanId: 4, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'IT', email: 'putri.rahayu@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Melakukan pengujian manual dan otomatis untuk menemukan bug.' },
    
    // HR Department
    { id: 9, noPegawai: 'H001', nama: 'Agus Salim', posisiId: 'HR-MGR-01', posisi: 'HR Manager', atasanId: 100, bawahanIds: [10], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', email: 'agus.salim@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengelola fungsi sumber daya manusia, termasuk rekrutmen dan pengembangan karyawan.' },
    { id: 10, noPegawai: 'H002', nama: 'Agus Hartono', posisiId: 'HR-SPV-01', posisi: 'HR Supervisor', atasanId: 9, bawahanIds: [11, 12], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', email: 'agus.hartono@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengawasi kegiatan rekrutmen dan administrasi karyawan.' },
    { id: 11, noPegawai: 'H003', nama: 'Citra Kirana', posisiId: 'HR-REC-01', posisi: 'Recruiter', atasanId: 10, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', email: 'citra.kirana@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Bertanggung jawab untuk mencari dan merekrut talenta baru.' },
    { id: 12, noPegawai: 'H004', nama: 'Eko Pranoto', posisiId: 'HR-ADM-01', posisi: 'HR Administrator', atasanId: 10, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'HR', email: 'eko.pranoto@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengurus administrasi harian departemen SDM.' },
    
    // FINANCE Department
    { id: 13, noPegawai: 'F001', nama: 'Sinta Dewi', posisiId: 'FIN-MGR-01', posisi: 'Finance Manager', atasanId: 100, bawahanIds: [14], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', email: 'sinta.dewi@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Bertanggung jawab atas manajemen keuangan dan laporan akuntansi.' },
    { id: 14, noPegawai: 'F002', nama: 'Fajar Kurniawan', posisiId: 'FIN-ACC-01', posisi: 'Accountant', atasanId: 13, bawahanIds: [15], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', email: 'fajar.kurniawan@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Menyiapkan laporan keuangan dan mengelola pembukuan.' },
    { id: 15, noPegawai: 'F003', nama: 'Nia Pratiwi', posisiId: 'FIN-JNR-01', posisi: 'Junior Accountant', atasanId: 14, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'FINANCE', email: 'nia.pratiwi@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Membantu tim akuntansi dalam tugas harian.' },
    
    // MARKETING Department
    { id: 16, noPegawai: 'M001', nama: 'Bayu Aditama', posisiId: 'MKT-MGR-01', posisi: 'Marketing Manager', atasanId: 100, bawahanIds: [17, 18], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', email: 'bayu.aditama@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Merencanakan dan melaksanakan strategi pemasaran.' },
    { id: 17, noPegawai: 'M002', nama: 'Rina Puspita', posisiId: 'MKT-SPV-01', posisi: 'Marketing Supervisor', atasanId: 16, bawahanIds: [19], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', email: 'rina.puspita@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengawasi kampanye pemasaran dan tim kreatif.' },
    { id: 18, noPegawai: 'M003', nama: 'Taufik Hidayat', posisiId: 'MKT-CRE-01', posisi: 'Creative Specialist', atasanId: 16, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', email: 'taufik.hidayat@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Mengembangkan materi visual dan konten kreatif.' },
    { id: 19, noPegawai: 'M004', nama: 'Dinda Ayu', posisiId: 'MKT-JNR-01', posisi: 'Marketing Staff', atasanId: 17, bawahanIds: [], perusahaan: 'PT. Teknologi Maju', departemen: 'MARKETING', email: 'dinda.ayu@teknologimaju.com', fotoProfil: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', uraian: 'Membantu pelaksanaan kegiatan pemasaran harian.' },
];

const OrgCard = ({ employee, onShowDetails, onPanUp, onToggleBawahan, onShowUraian }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 w-64 border border-blue-400">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-sm">{employee.departemen}</h4>
                <div className="flex space-x-1">
                    {employee.atasanId !== null && (
                        <button onClick={() => onPanUp(employee.atasanId)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                            ▲
                        </button>
                    )}
                    {employee.bawahanIds.length > 0 && (
                        <button onClick={() => onToggleBawahan(employee.id)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                            ▼
                        </button>
                    )}
                </div>
            </div>
            <div className="text-center">
                <img src={employee.fotoProfil} alt="Profil" className="w-16 h-16 mx-auto rounded-full mb-2" />
                <p className="font-semibold">{employee.nama}</p>
                <p className="text-xs text-gray-500">{employee.posisi}</p>
                <p className="text-xs text-gray-500">No. Pegawai: {employee.noPegawai}</p>
            </div>
            <div className="mt-4 flex flex-col space-y-2">
                <button onClick={() => onShowDetails(employee)} className="w-full text-center py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                    Lihat Detail
                </button>
                <button onClick={() => onShowUraian(employee)} className="w-full text-center py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600">
                    Uraian Jabatan
                </button>
            </div>
        </div>
    );
};

// Komponen baru untuk tampilan uraian penuh
const UraianJabatanCanvas = ({ employee, onClose }) => {
    if (!employee) return null;
    return (
        <div className="absolute inset-0 bg-gray-100 flex flex-col p-8 z-30 overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-800">Uraian Jabatan</h2>
                <button onClick={onClose} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Tutup
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="md:w-1/3 text-center">
                    <img src={employee.fotoProfil} alt="Profil" className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-blue-400" />
                    <h3 className="text-2xl font-bold">{employee.nama}</h3>
                    <p className="text-xl text-gray-600">{employee.posisi}</p>
                    <p className="text-sm text-gray-500 mt-1">No. Pegawai: {employee.noPegawai}</p>
                </div>
                <div className="md:w-2/3">
                    <h4 className="text-xl font-semibold mb-2 text-blue-600">Deskripsi Pekerjaan</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {employee.uraian || 'Uraian jabatan belum tersedia.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function OrgChart() {
    const chartRef = useRef(null);
    const cardRefs = useRef({}); 

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openBawahan, setOpenBawahan] = useState({});
    const [uraianMode, setUraianMode] = useState(null); // State baru untuk mode uraian jabatan

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    
    // Perbaikan: Logika panah bawah
    const handleToggleBawahan = (employeeId) => {
        setOpenBawahan(prev => ({
            ...prev,
            [employeeId]: !prev[employeeId] // Toggle status bawahan
        }));
    };

    const handlePanUp = (atasanId) => {
        const atasan = DUMMY_EMPLOYEES.find(emp => emp.id === atasanId);
        if (atasan) {
            setSearch('');
            setSearchResults([]);
            setOpenBawahan({ [atasanId]: true });
        }
    };

    const handleShowDetails = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
    };
    
    const handleShowUraian = (employee) => {
        setUraianMode(employee);
    };

    const handleCloseUraian = () => {
        setUraianMode(null);
    };

    const handleFullView = () => {
        setSearch('');
        setSearchResults([]);
        setOpenBawahan({});
        setUraianMode(null);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - chartRef.current.offsetLeft);
        setScrollLeft(chartRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - chartRef.current.offsetLeft;
        const walk = (x - startX);
        chartRef.current.scrollLeft = scrollLeft - walk;
    };
    
    // Fungsi rekursif untuk me-render hierarki
    const renderHierarchy = (employeeId) => {
        const employee = DUMMY_EMPLOYEES.find(emp => emp.id === employeeId);
        if (!employee) return null;
    
        const subordinates = DUMMY_EMPLOYEES.filter(emp => emp.atasanId === employeeId);
        const isOpen = openBawahan[employeeId];
        
        return (
            <div 
                key={employee.id} 
                className="relative flex flex-col items-center" 
                ref={el => cardRefs.current[`card-${employee.id}`] = el}
            >
                <OrgCard 
                    employee={employee} 
                    onShowDetails={handleShowDetails} 
                    onPanUp={handlePanUp}
                    onToggleBawahan={handleToggleBawahan}
                    onShowUraian={handleShowUraian}
                />
                {isOpen && subordinates.length > 0 && (
                    <div className="flex justify-center mt-12 gap-x-12">
                        {subordinates.map(subordinate => (
                            renderHierarchy(subordinate.id)
                        ))}
                    </div>
                )}
            </div>
        );
    };
    
    // Efek untuk menggambar konektor SVG (disesuaikan)
    useEffect(() => {
        const drawConnectors = () => {
            const svg = chartRef.current.querySelector('svg');
            if (!svg) return;

            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }

            const drawLine = (x1, y1, x2, y2) => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', '#9CA3AF');
                line.setAttribute('strokeWidth', '2');
                svg.appendChild(line);
            };

            const traverseAndDraw = (employeeId) => {
                const parentRef = cardRefs.current[`card-${employeeId}`];
                const subordinates = DUMMY_EMPLOYEES.filter(emp => emp.atasanId === employeeId);

                if (parentRef && openBawahan[employeeId] && subordinates.length > 0) {
                    const parentRect = parentRef.getBoundingClientRect();
                    const svgRect = svg.getBoundingClientRect();

                    const parentX = parentRect.left + parentRect.width / 2 - svgRect.left;
                    const parentY = parentRect.bottom - svgRect.top;
                    
                    const childrenCoords = subordinates.map(child => {
                        const childRef = cardRefs.current[`card-${child.id}`];
                        if (childRef) {
                            const childRect = childRef.getBoundingClientRect();
                            return {
                                x: childRect.left + childRect.width / 2 - svgRect.left,
                                y: childRect.top - svgRect.top
                            };
                        }
                        return null;
                    }).filter(c => c !== null);
                    
                    if (childrenCoords.length > 0) {
                        const minX = Math.min(...childrenCoords.map(c => c.x));
                        const maxX = Math.max(...childrenCoords.map(c => c.x));

                        drawLine(parentX, parentY, parentX, parentY + 20);

                        const middleY = parentY + 20;
                        drawLine(minX, middleY, maxX, middleY);

                        childrenCoords.forEach(childCoord => {
                            drawLine(childCoord.x, middleY, childCoord.x, childCoord.y);
                        });

                        subordinates.forEach(sub => traverseAndDraw(sub.id));
                    }
                }
            };

            DUMMY_EMPLOYEES.filter(emp => emp.atasanId === null).forEach(root => traverseAndDraw(root.id));
        };

        const handleResize = () => drawConnectors();
        drawConnectors();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [openBawahan]);

    // Efek untuk fungsionalitas pencarian
    useEffect(() => {
        if (search.trim() === '') {
            setSearchResults([]);
        } else {
            const results = DUMMY_EMPLOYEES.filter(emp =>
                emp.nama.toLowerCase().includes(search.toLowerCase()) || emp.noPegawai.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [search]);

    // Atasan tertinggi (root) yang tidak memiliki atasan
    const roots = DUMMY_EMPLOYEES.filter(emp => emp.atasanId === null);
    
    return (
        <div className="p-2 bg-gray-100 min-h-screen relative">
            {uraianMode && (
                <UraianJabatanCanvas employee={uraianMode} onClose={handleCloseUraian} />
            )}

            <h2 className="text-2xl font-bold mb-4">Struktur Organisasi</h2>
            <div className="mb-4">
                <button onClick={handleFullView} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Tampilan Penuh
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari nama pegawai..."
                    className="w-full p-2 border rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {searchResults.length > 0 && (
                <div className="mb-4 overflow-auto border rounded bg-white shadow-sm">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">No. Pegawai</th>
                                <th className="px-4 py-2">Nama</th>
                                <th className="px-4 py-2">Posisi</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Departemen</th>
                                <th className="px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map(emp => (
                                <tr key={emp.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{emp.noPegawai}</td>
                                    <td className="px-4 py-2">{emp.nama}</td>
                                    <td className="px-4 py-2">{emp.posisi}</td>
                                    <td className="px-4 py-2">{emp.email}</td>
                                    <td className="px-4 py-2">{emp.departemen}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => setOpenBawahan({ [emp.atasanId]: true, [emp.id]: true })} className="text-blue-500 hover:underline">
                                            Lihat Hierarki
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div 
                className="bg-white p-6 rounded-lg shadow overflow-auto relative" 
                ref={chartRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"></svg>
                <div className="relative z-20">
                    {roots.map(root => renderHierarchy(root.id))}
                </div>
            </div>
            {isModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <h3 className="text-xl font-semibold">Detail Pegawai</h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">&times;</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-500">No. Pegawai:</p>
                            <p className="font-semibold">{selectedEmployee.noPegawai}</p>
                            
                            <p className="text-gray-500">Nama:</p>
                            <p className="font-semibold">{selectedEmployee.nama}</p>
                            
                            <p className="text-gray-500">Posisi:</p>
                            <p className="font-semibold">{selectedEmployee.posisi}</p>

                            <p className="text-gray-500">Email:</p>
                            <p className="font-semibold">{selectedEmployee.email}</p>
                            
                            <p className="text-gray-500">Perusahaan:</p>
                            <p className="font-semibold">{selectedEmployee.perusahaan}</p>
                            
                            <p className="text-gray-500">Departemen:</p>
                            <p className="font-semibold">{selectedEmployee.departemen}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}