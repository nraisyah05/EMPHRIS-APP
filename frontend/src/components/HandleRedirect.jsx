// src/components/HandleRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        // Ambil session setelah redirect Google
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getSession:", error.message);
          navigate("/"); // fallback ke login kalau gagal
          return;
        }

        if (data?.session) {
          const email = data.session.user.email;

          // Cek role user dari tabel "users"
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("role")
            .eq("email", email)
            .single();

          if (userError) {
            console.error("Fetch user role error:", userError.message);
            navigate("/default-dashboard");
            return;
          }

          // Arahkan sesuai role
          if (userData?.role === "hr") {
            navigate("/hr-dashboard");
          } else if (userData?.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/default-dashboard");
          }
        } else {
          navigate("/"); // kalau tidak ada session, balik ke login
        }
      } catch (err) {
        console.error("HandleRedirect error:", err.message);
        navigate("/");
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600 text-lg">Sedang memproses login...</p>
    </div>
  );
};

export default HandleRedirect;