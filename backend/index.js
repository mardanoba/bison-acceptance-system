import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import dotenv from "dotenv";
import { db } from "./db.js";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

// Middleware to verify Admin JWT
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.admin = decoded;
    next();
  });
}

// --------------------- ROUTES ---------------------

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  const query = "SELECT * FROM admins WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(401).json({ message: "Admin not found" });

    const admin = result[0];

    bcrypt.compare(password, admin.password_hash, (err, isMatch) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({ token, username: admin.username });
    });
  });
});

// Add accepted user (with photo upload)
app.post("/api/admin/add-user", verifyAdmin, upload.single("photo"), (req, res) => {
  const { full_name, passport_id, work_id, work_type, sex } = req.body;
  const photo = req.file ? req.file.filename : null;
  const uuid = uuidv4(); // unique permanent link token

  const query = `
    INSERT INTO accepted_users (uuid, full_name, passport_id, work_id, work_type, sex, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [uuid, full_name, passport_id, work_id, work_type, sex, photo], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    // FIXED LINK: points to the correct Welcome Page route
    res.json({
      message: "User added successfully",
      link: `http://localhost:5173/welcome/${uuid}` // <-- changed from /accept
    });
  });
});

// Get user by UUID
app.get("/api/user/:uuid", (req, res) => {
  const { uuid } = req.params;

  const query = "SELECT * FROM accepted_users WHERE uuid = ?";
  db.query(query, [uuid], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  });
});

// Get user by Passport ID
app.get("/api/user/passport/:passport_id", (req, res) => {
  const { passport_id } = req.params;

  const query = "SELECT * FROM accepted_users WHERE passport_id = ?";
  db.query(query, [passport_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});

// Get user by Work ID
app.get("/api/user/work/:work_id", (req, res) => {
  const { work_id } = req.params;

  const query = "SELECT * FROM accepted_users WHERE work_id = ?";
  db.query(query, [work_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(result[0]);
  });
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// --------------------- START SERVER ---------------------
app.get("/", (req, res) => {
  res.json({ message: "Backend is working" });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

