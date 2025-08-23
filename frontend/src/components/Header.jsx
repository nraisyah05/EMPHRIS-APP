import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { supabase } from '../supabaseClient'; 

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  // Ambil user dari Google Auth / Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          // Ambil detail tambahan dari tabel "profiles"
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, fullname')
            .eq('id', user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            // Kalau error selain "no rows found"
            console.error('Profile fetch error:', profileError);
          }

          setUser({
            email: user.email,
            role: profile?.role || 'user',
            fullname: profile?.fullname || (user.email ? user.email.split('@')[0] : 'User'),
          });
        }
      } catch (err) {
        console.error('Auth fetch error:', err.message);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const handleProfileClick = () => {
    if (user?.role === 'hr') {
      navigate('/hr-dashboard/profile');
    } else {
      navigate('/user-dashboard/profile');
    }
  };

  const displayName = user?.fullname || (user?.email ? user.email.split('@')[0] : "User");

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-sm">
      {/* Judul Dashboard sesuai role */}
      <h4 className="text-xl font-bold text-[#3aba42]">
        {user?.role === 'hr' ? 'HR Dashboard' : 'Dashboard'}
      </h4>
      
      {/* Profile Section */}
      <div className="relative">
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
          className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <span className="mr-2 hidden md:block">{displayName}</span>
          <FaUserCircle size={32} />
        </div>

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
