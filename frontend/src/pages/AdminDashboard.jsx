import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    full_name: "",
    passport_id: "",
    work_id: "",
    work_type: "",
    sex: "",
    photo: null,
  });
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

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

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) return setMessage("You are not logged in");

    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);

    try {
      const res = await fetch("https://bison-backend.onrender.com/api/admin/add-user", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage(result.message);
        setLink(result.link);
        setFormData({
          full_name: "",
          passport_id: "",
          work_id: "",
          work_type: "",
          sex: "",
          photo: null,
        });
      } else setMessage(result.message);
    } catch (err) {
      setMessage("Server error: " + err.message);
    }
  };

  // ---------- Inline Styles ----------
  const container = {
    width: "450px",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#ffffff", // white container
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  };

  const header = {
    textAlign: "center",
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
    e.target.style.borderColor = "#3498db"; // blue focus
    e.target.style.boxShadow = "0 0 5px rgba(52, 152, 219, 0.5)";
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
    textAlign: "center",
    color: "#27ae60",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const linkStyle = {
    display: "block",
    marginTop: "12px",
    textAlign: "center",
    color: "#2980b9",
    fontWeight: "500",
    textDecoration: "none",
    wordBreak: "break-word",
  };

  return (
    <div style={container}>
      <h2 style={header}>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={input}
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          required
        />
        <input
          style={input}
          name="passport_id"
          placeholder="Passport ID"
          value={formData.passport_id}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          required
        />
        <input
          style={input}
          name="work_id"
          placeholder="Work ID"
          value={formData.work_id}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          required
        />
        <input
          style={input}
          name="work_type"
          placeholder="Type of Work"
          value={formData.work_type}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          required
        />
        <select
          style={input}
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          required
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          style={input}
          type="file"
          name="photo"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={button}
          onMouseOver={hoverButton}
          onMouseOut={outButton}
        >
          Add User
        </button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          {link}
        </a>
      )}
    </div>
  );
}
