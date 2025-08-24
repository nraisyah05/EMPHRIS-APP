import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Pastikan Anda menggunakan URL dan Anon Key yang sama
const supabaseUrl = 'https://iovcpjksvqxpuxhjtvbf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdmNwamtzdnF4cHV4aGp0dmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjAwNTgsImV4cCI6MjA3MTQ5NjA1OH0.axEZ-Len3kxhlTaCh9_06J4nr1HcESXFghxu-jesaEQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginRedirect = async () => {
      // Dapatkan sesi pengguna saat ini
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Jika sesi ada, ambil role pengguna dari database
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Gagal mendapatkan role:', error.message);
          navigate('/login'); // Kembali ke halaman login jika gagal
          return;
        }

        const userRole = data?.role;

        // Arahkan ke dashboard yang sesuai
        if (userRole === 'hr') {
          navigate('/hr-dashboard');
        } else if (userRole === 'user') {
          navigate('/user-dashboard');
        } else {
          // Pengalihan default jika tidak ada role yang cocok
          navigate('/default-dashboard');
        }
      } else {
        // Jika tidak ada sesi, kembali ke halaman login
        navigate('/login');
      }
    };

    handleLoginRedirect();
  }, [navigate]);

  // Tampilkan layar loading saat memproses pengalihan
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-gray-500">
        <svg className="animate-spin h-10 w-10 text-[#3aba42] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4">Memproses login Anda...</p>
      </div>
    </div>
  );
};

export default HandleRedirect;