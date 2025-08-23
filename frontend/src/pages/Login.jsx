import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import empLogo from "../assets/logo-emp.png";
import backgroundImg from "../assets/background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email dan password harus diisi!");
      return;
    }

    // --- Logika penentuan role (peran) ---
    let userRole = null;
    if (email === "hr@emp.com" && password === "123") {
      userRole = "hr";
    } else if (email === "user@emp.com" && password === "123") {
      userRole = "user";
    } else {
      setMessage("Email atau password salah!");
      return;
    }

    // Simpan role dan email ke localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        role: userRole,
      })
    );

    // Arahkan ke dashboard yang sesuai
    if (userRole === "hr") {
      navigate("/hr-dashboard");
    } else if (userRole === "user") {
      navigate("/user-dashboard");
    }
  };

  const styles = {
    // ... (kode styling Anda di sini, tidak ada perubahan)
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "rgba(255,255,255,0.95)",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      overflow: "hidden",
      maxWidth: "420px",
      width: "100%",
    },
    header: {
      backgroundColor: "#3aba42",
      padding: "20px",
      textAlign: "center",
      color: "#ffffff",
      fontSize: "22px",
      fontWeight: "bold",
    },
    content: {
      padding: "30px",
      textAlign: "center",
    },
    logo: {
      width: "80px",
      marginBottom: "15px",
      display: "block",
      margin: "0 auto 15px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    input: {
      padding: "12px 16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.3s ease",
    },
    button: {
      padding: "14px 0",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#3aba42",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    infoBox: {
      marginTop: "20px",
      textAlign: "left",
      fontSize: "13px",
      color: "#555",
      backgroundColor: "#f8f9fa",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      lineHeight: "1.5",
    },
    message: {
      marginTop: "15px",
      color: "#3aba42",
      fontWeight: 500,
    },
    footer: {
      backgroundColor: "#3aba42",
      color: "#ffffff",
      padding: "12px",
      textAlign: "center",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>Login HRIS</div>
        <div style={styles.content}>
          <img src={empLogo} alt="EMP Logo" style={styles.logo} />

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2e9e35")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3aba42")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Login
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}

          <div style={styles.infoBox}>
            <strong>User Name</strong> menggunakan alamat email lengkap
            <br />
            <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
              <li>
                Contoh yang BENAR: <em>amir.budi@pelita-air.com</em>
              </li>
              <li>
                Contoh yang SALAH: <em>amir.budi</em>
              </li>
            </ul>
            <br />
            <strong>Password</strong> menggunakan password email Anda
          </div>
        </div>
        <div style={styles.footer}>© 2025 PT EMP. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Login;