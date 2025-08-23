import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data pengguna
  const navigate = useNavigate();

  // Ambil data pengguna dari localStorage saat komponen dimuat
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Hapus data pengguna dari localStorage
    localStorage.removeItem('user');
    // Arahkan pengguna ke halaman login
    navigate('/');
  };

  const handleProfileClick = () => {
    // Navigasi ke halaman profil pengguna
    // Sesuaikan path dengan role pengguna
    if (user && user.role === 'hr') {
      navigate('/hr-dashboard/profile');
    } else {
      navigate('/user-dashboard/profile');
    }
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center">
      {/* Tampilkan judul dashboard sesuai role */}
      <h4 className="text-xl font-bold text-[#3aba42]">
        {user && user.role === 'hr' ? 'HR Dashboard' : 'Dashboard'}
      </h4>
      
      {/* Container untuk profil dan dropdown */}
      <div className="relative">
        {/* Ikon profil yang bisa diklik */}
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
          className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          {/* Tampilkan nama pengguna jika tersedia */}
          <span className="mr-2 hidden md:block">{user?.email.split('@')[0]}</span>
          <FaUserCircle size={32} />
        </div>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div 
              onClick={handleProfileClick} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              My Profile
            </div>
            <div 
              onClick={handleLogout} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;