import { useState, useEffect } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Set page background and font
  useEffect(() => {
    document.body.style.backgroundColor = "#fff9e6"; // Soft cream background
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://bison-acceptance-system.onrender.com//api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } else {
      setMessage(data.message);
    }
  };

  // ---------- Inline Styles ----------
  const container = {
    width: "400px",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#ffffff", // white form card
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
  };

  const header = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "30px",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "15px",
    transition: "0.3s border, 0.3s box-shadow",
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = "#2980b9";
    e.target.style.boxShadow = "0 0 5px rgba(41, 128, 185, 0.4)";
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = "#ccc";
    e.target.style.boxShadow = "none";
  };

  const button = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2980b9",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
  };
  const hoverButton = (e) => (e.target.style.backgroundColor = "#3498db");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  const messageStyle = {
    marginTop: "20px",
    color: "#27ae60",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={container}>
      <h2 style={header}>Admin Login - Bison Transport</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={inputFocus}
          onBlur={inputBlur}
          style={input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={inputFocus}
          onBlur={inputBlur}
          style={input}
          required
        />
        <button
          type="submit"
          style={button}
          onMouseOver={hoverButton}
          onMouseOut={outButton}
        >
          Login
        </button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
}
