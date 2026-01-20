import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WelcomePage() {
  const [passportId, setPassportId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8E7";
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
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
      const res = await fetch(`https://bison-acceptance-system.onrender.com/api/user/passport/${passportId}`);
      if(!res.ok) throw new Error("User not found");
      const user = await res.json();
      navigate(`/congratulations/${user.passport_id}`);
    } catch(err){ setError(err.message || "Error fetching user"); }
  };

  const container = { width:"95%", maxWidth:"750px", backgroundColor:"#fff8e7", padding:"30px", borderRadius:"15px", boxShadow:"0 10px 25px rgba(0,0,0,0.2)", textAlign:"center", overflowY:"auto", maxHeight:"90vh", boxSizing:"border-box" };
  const header = { fontSize:"30px", fontWeight:"700", color:"#2C3E50", marginBottom:"20px" };
  const text = { fontSize:"16px", color:"#34495e", lineHeight:"1.7", marginBottom:"20px" };
  const section = { textAlign:"left", margin:"30px 0" };
  const subHeader = { color:"#2C3E50", marginBottom:"10px", fontWeight:"600" };
  const input = { width:"100%", maxWidth:"400px", padding:"12px", fontSize:"16px", borderRadius:"8px", border:"1px solid #2C3E50", outline:"none", marginBottom:"15px", transition:"0.3s border,0.3s box-shadow", boxSizing:"border-box" };
  const inputFocus = (e)=>{ e.target.style.borderColor="#1F618D"; e.target.style.boxShadow="0 0 8px rgba(31,97,141,0.4)"; };
  const inputBlur = (e)=>{ e.target.style.borderColor="#2C3E50"; e.target.style.boxShadow="none"; };
  const button = { padding:"12px 25px", fontSize:"16px", fontWeight:"600", borderRadius:"8px", border:"none", cursor:"pointer", backgroundColor:"#2980b9", color:"#fff", transition:"all 0.3s" };
  const hoverButton=(e)=>e.target.style.backgroundColor="#1F618D";
  const outButton=(e)=>e.target.style.backgroundColor="#2980b9";
  const errorStyle={color:"#c0392b", fontWeight:"bold", marginTop:"12px"};
  const imageStyle={ width:"100%", borderRadius:"10px", marginBottom:"20px", height:"auto", objectFit:"cover" };

  return (
    <div style={container}>
      <img src="/images/fastway1.webp" alt="Bison Transport" style={imageStyle}/>
      <h1 style={header}>Welcome to Fastway Ireland!</h1>
      <p style={text}>This is your acceptance system. You can check your acceptance status below.</p>
      <div style={section}>
        <h2 style={subHeader}>About the Company</h2>
        <p style={text}>Fastway is Ireland's Trusted Supply Chain Solutions Partner and delivery company. </p>
        <img src="/images/fastway.webp" alt="Mission" style={imageStyle}/>
        <h3 style={subHeader}>Mission</h3>
        <p style={text}>Fastway's mission is to be a leading asset-based freight and delivery solutions.</p>
        <img src="/images/fastway3.webp" alt="Vision" style={imageStyle}/>
        <h3 style={subHeader}>Vision</h3>
        <p style={text}>Bison Transport is committed to sustainability and innovation.</p>
      </div>
      <input type="text" placeholder="Enter your Passport ID" value={passportId} onChange={(e)=>setPassportId(e.target.value)} onFocus={inputFocus} onBlur={inputBlur} style={input}/>
      <button onClick={handleCheckStatus} style={button} onMouseOver={hoverButton} onMouseOut={outButton}>Check Status</button>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default WelcomePage;
