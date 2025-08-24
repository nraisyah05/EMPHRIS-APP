import React from 'react';
import { useNavigate } from 'react-router-dom';

const DefaultDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Di sini Anda bisa menambahkan logika logout jika diperlukan
    // Misalnya, membersihkan sesi atau token
    
    // Alihkan pengguna kembali ke halaman login
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
        <p className="mt-4 text-gray-600">
          Maaf, Anda tidak memiliki akses ke dashboard khusus. Silakan hubungi administrator Anda.
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 px-4 rounded-md bg-[#3aba42] text-white font-medium cursor-pointer transition-all duration-200 hover:bg-[#2d8d32] active:scale-98"
        >
          Kembali ke Halaman Login
        </button>
      </div>
    </div>
  );
};

export default DefaultDashboard;