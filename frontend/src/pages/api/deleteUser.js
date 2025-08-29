// pages/api/deleteUser.js

import { createClient } from '@supabase/supabase-js';

// **PENTING:** Gunakan Service Role Key di sini untuk hak akses penuh.
// JANGAN PERNAH DI BAGIKAN DI KODE FRONT-END!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // Tangani jika variabel lingkungan tidak ada
  throw new Error('Missing Supabase URL or Service Role Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // 1. Hapus dari tabel `users` (jika ada `ON DELETE CASCADE`, `employee_profile` akan terhapus otomatis)
    const { error: usersError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (usersError) {
      console.error('Error deleting from users table:', usersError.message);
      return res.status(500).json({ error: 'Failed to delete user data: ' + usersError.message });
    }

    // 2. Hapus akun pengguna dari Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error('Error deleting from auth.users:', authError.message);
      return res.status(500).json({ error: 'Failed to delete user account: ' + authError.message });
    }

    // Jika semua berhasil, kirim respons yang valid
    return res.status(200).json({ message: 'Data karyawan dan akun berhasil dihapus!' });

  } catch (error) {
    console.error('Unexpected error in deleteUser API:', error.message);
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}