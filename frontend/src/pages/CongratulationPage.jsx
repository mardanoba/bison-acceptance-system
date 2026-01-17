import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CongratulationPage() {
  const { passportId } = useParams();
  const [user, setUser] = useState(null);
  const [workIdInput, setWorkIdInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://bison-backend.onrender.com/api/user/passport/${passportId}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Error fetching user");
      }
    };

    fetchUser();
  }, [passportId]);

  const handleCheckDigitalId = () => {
    if (!workIdInput) return setError("Please enter Work ID");
    navigate(`/digital-id/${workIdInput}`);
  };

  // ---------- Styles ----------
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FFF8E7", // Light cream background
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const container = {
    maxWidth: "650px",
    width: "100%",
    backgroundColor: "#fff8e7",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const header = {
    fontSize: "30px",
    fontWeight: "700",
    color: "#2C3E50", // Dark blue
    marginBottom: "25px",
  };

  const photoStyle = {
    width: "200px",
    borderRadius: "10px",
    margin: "20px 0",
    border: "2px solid #2C3E50",
  };

  const detailStyle = {
    textAlign: "left",
    margin: "20px 0",
    color: "#34495e",
    fontSize: "16px",
    lineHeight: "1.6",
  };

  const input = {
    padding: "12px",
    width: "80%",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #2C3E50",
    outline: "none",
    marginBottom: "10px",
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = "#2980b9"; // Blue highlight
    e.target.style.boxShadow = "0 0 8px rgba(41,128,185,0.4)";
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = "#2C3E50";
    e.target.style.boxShadow = "none";
  };

  const button = {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2980b9", // Blue button
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    marginTop: "10px",
  };
  const hoverButton = (e) => (e.target.style.backgroundColor = "#1F618D");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  const errorStyle = {
    color: "#c0392b",
    fontWeight: "bold",
    marginTop: "15px",
  };

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={container}>
          <h2 style={{ ...header, color: "#c0392b" }}>Error</h2>
          <p style={errorStyle}>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={container}>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={container}>
        <h1 style={header}>Congratulations, {user.full_name}!</h1>

        {user.photo && (
          <img
            src={`https://bison-backend.onrender.com/uploads/${user.photo}`}
            alt={user.full_name}
            style={photoStyle}
          />
        )}

        <div style={detailStyle}>
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Passport ID:</strong> {user.passport_id}</p>
          <p><strong>Work ID:</strong> {user.work_id}</p>
          <p><strong>Work Type:</strong> {user.work_type}</p>
          <p><strong>Sex:</strong> {user.sex}</p>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#2C3E50", marginBottom: "10px" }}>Check Digital ID</h3>
          <input
            type="text"
            placeholder="Enter your Work ID"
            value={workIdInput}
            onChange={(e) => setWorkIdInput(e.target.value)}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={input}
          />
          <br />
          <button
            onClick={handleCheckDigitalId}
            style={button}
            onMouseOver={hoverButton}
            onMouseOut={outButton}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default CongratulationPage;
