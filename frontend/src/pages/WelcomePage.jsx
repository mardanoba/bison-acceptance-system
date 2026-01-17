import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WelcomePage() {
  const [passportId, setPassportId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();

  // ---------- Page background ----------
  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8E7"; // Light cream
    document.body.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }, []);

  const handleCheckStatus = async () => {
    if (!passportId) return setError("Please enter your Passport ID");

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/passport/${passportId}`
      );
      if (!res.ok) throw new Error("User not found");

      const user = await res.json();
      navigate(`/congratulations/${user.passport_id}`);
    } catch (err) {
      setError(err.message || "Error fetching user");
    }
  };

  // ---------- Styles ----------
  const container = {
    maxWidth: "750px",
    width: "100%",
    backgroundColor: "#fff8e7", // light cream card
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    overflowY: "auto",
    maxHeight: "90vh",
  };

  const header = {
    fontSize: "30px",
    fontWeight: "700",
    color: "#2C3E50", // dark blue
    marginBottom: "20px",
  };

  const text = {
    fontSize: "16px",
    color: "#34495e",
    lineHeight: "1.7",
    marginBottom: "20px",
  };

  const section = {
    textAlign: "left",
    margin: "30px 0",
  };

  const subHeader = {
    color: "#2C3E50",
    marginBottom: "10px",
    fontWeight: "600",
  };

  const input = {
    width: "80%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #2C3E50",
    outline: "none",
    marginBottom: "15px",
    transition: "0.3s border, 0.3s box-shadow",
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = "#1F618D"; // dark blue highlight
    e.target.style.boxShadow = "0 0 8px rgba(31,97,141,0.4)";
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = "#2C3E50";
    e.target.style.boxShadow = "none";
  };

  const button = {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2980b9", // blue button
    color: "#fff",
    transition: "all 0.3s",
  };
  const hoverButton = (e) => (e.target.style.backgroundColor = "#1F618D");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  const errorStyle = {
    color: "#c0392b",
    fontWeight: "bold",
    marginTop: "12px",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  return (
    <div style={container}>
      {/* Top banner image */}
      <img src="/images/bison.webp" alt="Bison Transport" style={imageStyle} />

      <h1 style={header}>Welcome to Bison Transport!</h1>
      <p style={text}>
        This is your acceptance system. You can check your acceptance status below.
      </p>

      {/* About Company */}
      <div style={section}>
        <h2 style={subHeader}>About the Company</h2>
        <p style={text}>
          Bison is North America's Trusted Supply Chain Solutions Partner. Mile after
          mile our people-driven culture, innovative approach and dedication to
          excellence in customer service set us apart from the rest. We’re elevating
          the Professional Driver experience like never before. Our award-winning
          culture and unparalleled commitment to safety, teamwork and flexibility
          puts us in a lane of our own. And with a variety of renowned clients on
          the journey with us, you’ll have the stability to achieve more – mile
          after mile.
        </p>

        {/* Mission */}
        <img src="/images/bison1.webp" alt="Mission" style={imageStyle} />
        <h3 style={subHeader}>Mission</h3>
        <p style={text}>
          Bison Transport's mission is to be a leading asset-based freight solutions
          provider, delivering award-winning transportation services throughout North
          America. The company is committed to safety, professionalism, and
          environmental sustainability, operating one of the largest and most modern
          fleets in the industry. Bison Transport focuses on providing reliable and
          efficient transportation solutions, ensuring that clients can trust their
          services and meet their shipping needs effectively.
        </p>

        {/* Vision */}
        <img src="/images/bison2.webp" alt="Vision" style={imageStyle} />
        <h3 style={subHeader}>Vision</h3>
        <p style={text}>
          Bison Transport is committed to sustainability and innovation in its
          transportation operations. The company aims to reduce carbon emissions per
          mile by 50% by 2035 and has implemented various initiatives, including:
          <br />• Battery Electric Vehicles
          <br />• Recycling Programs
          <br />• Safety and Efficiency
          <br />• Driver Skills Development
          <br />
          These efforts reflect Bison Transport's commitment to a sustainable supply
          chain and improving operational efficiency while addressing environmental
          concerns.
        </p>
      </div>

      {/* Passport ID input */}
      <div>
        <input
          type="text"
          placeholder="Enter your Passport ID"
          value={passportId}
          onChange={(e) => setPassportId(e.target.value)}
          onFocus={inputFocus}
          onBlur={inputBlur}
          style={input}
        />
      </div>

      <button
        onClick={handleCheckStatus}
        style={button}
        onMouseOver={hoverButton}
        onMouseOut={outButton}
      >
        Check Status
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default WelcomePage;
