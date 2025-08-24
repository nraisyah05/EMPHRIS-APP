import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo-emp.png';
import videoBackground from '../assets/videobackground.mp4'; // import video

// Supabase config
const supabaseUrl = 'https://iovcpjksvqxpuxhjtvbf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdmNwamtzdnF4cHV4aGp0dmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjAwNTgsImV4cCI6MjA3MTQ5NjA1OH0.axEZ-Len3kxhlTaCh9_06J4nr1HcESXFghxu-jesaEQ';

const Login = () => {
  const navigate = useNavigate();
  const [supabase, setSupabase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load Supabase client
  useEffect(() => {
    const loadSupabase = async () => {
      try {
        const { createClient } = await import(
          'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
        );
        setSupabase(createClient(supabaseUrl, supabaseAnonKey));
        setLoading(false);
      } catch (error) {
        console.error('Gagal memuat library Supabase:', error);
        setErrorMessage('Gagal memuat library Supabase. Silakan periksa koneksi internet.');
        setLoading(false);
      }
    };
    loadSupabase();
  }, []);

  // Function to get user role from the 'users' table
  const getUserRoleByUserId = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Gagal mendapatkan role pengguna:', error.message);
      return null;
    }
    return data.role;
  };

  const getUserRoleByEmail = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Gagal mendapatkan role berdasarkan email:', error.message);
      return null;
    }
    return data.role;
  };

  const redirectByRole = (role) => {
    if (role === 'hr') {
      navigate('/hr-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/default-dashboard');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!supabase || loading) {
      setErrorMessage('Supabase belum dimuat. Tidak dapat melanjutkan login.');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const userId = data.user.id;
      const userRole = await getUserRoleByUserId(userId);

      if (userRole) {
        redirectByRole(userRole);
      } else {
        setErrorMessage('Gagal mendapatkan role pengguna.');
      }
    } catch (error) {
      console.error('Login gagal:', error.message);
      setErrorMessage(`Login gagal. Coba cek email/password Anda. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase || loading) {
      setErrorMessage('Supabase belum dimuat. Tidak dapat melanjutkan login.');
      return;
    }

    const isDevelopment = window.location.hostname === 'localhost';
    const redirectUrl = isDevelopment
      ? 'http://localhost:5173/handle-redirect'
      : 'https://emphris-app.vercel.app/';

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) throw error;
      console.log('Mengalihkan ke Google untuk otentikasi...');
    } catch (error) {
      console.error('Login Google gagal:', error.message);
      setErrorMessage(`Login Google gagal. Silakan coba lagi. Error: ${error.message}`);
    }
  };

  // Listener untuk Google login selesai
  useEffect(() => {
    if (!supabase) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const user = session.user;
          const userRole = await getUserRoleByEmail(user.email);

          if (!userRole) {
            setErrorMessage('Email Anda tidak terdaftar di sistem HR.');
            await supabase.auth.signOut();
            return;
          }

          redirectByRole(userRole);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const closeErrorBox = () => {
    setErrorMessage('');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen font-sans text-sm">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={videoBackground} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Card Login */}
      <div className="bg-white bg-opacity-95 rounded-lg shadow-xl w-full max-w-sm md:max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#3aba42] p-2 text-center text-white text-lg font-semibold">
          <h3>Login HRIS</h3>
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="EMP Logo"
              className="max-h-16 w-auto mx-auto object-contain"
            />
          </div>

          {/* Login with Email and Password */}
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-[#3aba42] text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-[#3aba42] text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md bg-[#3aba42] text-white font-medium cursor-pointer transition-all duration-200 hover:bg-[#2d8d32] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Memuat...' : 'Login'}
            </button>
          </form>

          {/* Separator */}
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-2 text-gray-500 text-xs">ATAU</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Login with Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 font-medium cursor-pointer transition-all duration-200 hover:bg-gray-100 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Icon"
              className="w-4 h-4"
            />
            Login dengan Google
          </button>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md relative text-left text-xs">
              <span className="block sm:inline">{errorMessage}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-3 py-2 cursor-pointer"
                onClick={closeErrorBox}
              >
                <svg
                  className="fill-current h-4 w-4 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Tutup</title>
                  <path d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.934 2.935a1 1 0 1 1-1.414-1.414L8.586 10 5.652 7.066a1 1 0 0 1 1.414-1.414L10 8.586l2.934-2.934a1 1 0 0 1 1.414 1.414L11.414 10l2.934 2.935a1 1 0 0 1 0 1.414z" />
                </svg>
              </span>
            </div>
          )}

          <div className="mt-4 text-xs text-left text-gray-600">
            <p>
              <strong>User Name</strong> menggunakan alamat email lengkap
            </p>
            <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
              <li>
                Contoh yang BENAR: <em>amirbudi@emp.com</em>
              </li>
              <li>
                Contoh yang SALAH: <em>amirbudi</em>
              </li>
            </ul>
            <p className="mt-2">
              <strong>Password</strong> menggunakan password email Anda
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#3aba42] p-2 text-white text-center text-[10px]">
          © 2025 PT EMP Energi Gandewa. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
