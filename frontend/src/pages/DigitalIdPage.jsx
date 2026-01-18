import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DigitalIdPage() {
  const { workId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://bison-acceptance-system.onrender.com/api/user/work/${workId}`);
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
    backgroundColor: "#f0f2f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const idCard = {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    border: "2px solid #2980b9",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    overflow: "hidden",
    textAlign: "left",
    position: "relative",
    padding: "20px",
    marginBottom: "20px", // space for button below
  };

  const header = {
    backgroundColor: "#2980b9",
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "20px",
    padding: "12px",
    borderRadius: "10px 10px 0 0",
    marginBottom: "15px",
  };

  const logoStyle = {
    width: "50px",
    position: "absolute",
    top: "15px",
    right: "15px",
  };

  const photoStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    border: "2px solid #2980b9",
    objectFit: "cover",
    marginBottom: "15px",
  };

  const detailsContainer = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 20px",
    marginBottom: "10px",
    fontSize: "15px",
    color: "#2c3e50",
  };

  const detailLabel = { fontWeight: "600" };
  const detailValue = { fontWeight: "400" };

  const buttonStyle = {
    width: "200px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2980b9",
    color: "#fff",
    transition: "all 0.3s",
  };

  const hoverButton = (e) => (e.target.style.backgroundColor = "#1F618D");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  const errorStyle = {
    color: "#c0392b",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50px",
  };

  const messageStyle = {
    marginTop: "10px",
    fontStyle: "italic",
    color: "#34495e",
    textAlign: "center",
  };

  // ---------- Render ----------
  if (error)
    return (
      <div style={pageStyle}>
        <div style={idCard}>
          <h2 style={{ ...header, backgroundColor: "#c0392b" }}>Error</h2>
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
        <div style={header}>Bison Transport - Digital ID</div>
        <img src="..assets/b.webp" alt="Bison Logo" style={logoStyle} />
        {user.photo && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
            <img
              src={`https://bison-acceptance-system.onrender.com/uploads/${user.photo}`}
              alt={user.full_name}
              style={photoStyle}
            />
          </div>
        )}
        <div style={detailsContainer}>
          <div>
            <span style={detailLabel}>Full Name:</span>{" "}
            <span style={detailValue}>{user.full_name}</span>
          </div>
          <div>
            <span style={detailLabel}>Passport ID:</span>{" "}
            <span style={detailValue}>{user.passport_id}</span>
          </div>
          <div>
            <span style={detailLabel}>Work ID:</span>{" "}
            <span style={detailValue}>{user.work_id}</span>
          </div>
          <div>
            <span style={detailLabel}>Work Type:</span>{" "}
            <span style={detailValue}>{user.work_type}</span>
          </div>
          <div>
            <span style={detailLabel}>Sex:</span>{" "}
            <span style={detailValue}>{user.sex}</span>
          </div>
        </div>
        <p style={messageStyle}>This is your official digital ID for Bison Transport.</p>
      </div>

      {/* Print button outside the card */}
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
