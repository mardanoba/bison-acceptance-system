import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/b.webp"; // <-- Import your local image

function DigitalIdPage() {
  const { workId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://bison-acceptance-system.onrender.com/api/user/work/${workId}`
        );
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Error fetching user");
      }
    };
    fetchUser();
  }, [workId]);

  // ---------- Styles ----------
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FFF8E7",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column", // so button can be outside
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const idCard = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    border: "2px solid #2980b9",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    padding: "30px",
    textAlign: "center",
    margin: "10px",
  };

  const idHeader = {
    backgroundColor: "#2980b9",
    color: "#fff",
    padding: "15px 0",
    borderRadius: "10px 10px 0 0",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const logoStyle = {
    width: "100px",
    marginBottom: "15px",
  };

  const photoStyle = {
    width: "100%",
    maxWidth: "150px",
    borderRadius: "10px",
    border: "2px solid #2980b9",
    marginBottom: "20px",
  };

  const detailsContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "0 auto 20px",
    maxWidth: "100%",
    gap: "8px",
    color: "#34495e",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2980b9",
    color: "#fff",
    transition: "all 0.3s",
    marginTop: "20px",
  };

  const hoverButton = (e) => (e.target.style.backgroundColor = "#1F618D");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  const errorStyle = {
    color: "#c0392b",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50px",
  };

  const messageStyle = { marginTop: "15px", fontStyle: "italic", color: "#34495e" };

  // ---------- Render ----------
  if (error)
    return (
      <div style={pageStyle}>
        <div style={idCard}>
          <h2 style={{ ...idHeader, backgroundColor: "#c0392b" }}>Error</h2>
          <p style={errorStyle}>{error}</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div style={pageStyle}>
        <div style={idCard}>
          <p>Loading digital ID...</p>
        </div>
      </div>
    );

  return (
    <div style={pageStyle}>
      <div style={idCard}>
        {/* Bison Logo */}
        <img src={logo} alt="Bison Logo" style={logoStyle} />

        {/* ID Header */}
        <div style={idHeader}>Bison Transport - Digital ID</div>

        {/* User Photo */}
        {user.photo && (
          <img
            src={`https://bison-acceptance-system.onrender.com/uploads/${user.photo}`}
            alt={user.full_name}
            style={photoStyle}
          />
        )}

        {/* User Details */}
        <div style={detailsContainer}>
          <p>
            <strong>Full Name:</strong> {user.full_name}
          </p>
          <p>
            <strong>Passport ID:</strong> {user.passport_id}
          </p>
          <p>
            <strong>Work ID:</strong> {user.work_id}
          </p>
          <p>
            <strong>Work Type:</strong> {user.work_type}
          </p>
          <p>
            <strong>Sex:</strong> {user.sex}
          </p>
          <p>
            <strong>UUID:</strong> {user.uuid}
          </p>
        </div>

        <p style={messageStyle}>This is your official digital ID for Bison Transport.</p>
      </div>

      {/* Print button outside ID card */}
      <button
        style={buttonStyle}
        onMouseOver={hoverButton}
        onMouseOut={outButton}
        onClick={() => window.print()}
      >
        Print Digital ID
      </button>
    </div>
  );
}

export default DigitalIdPage;
