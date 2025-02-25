const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt"); 
const User = require("./model/User.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const mongoURI = "mongodb+srv://arun001:jai%20bharat@cluster0.nwkoe.mongodb.net/";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello, This is a simple API for user registration and retrieval.");
});

app.post("/api/save-user", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!password) return res.status(400).json({ error: "Password is required" });

    const hashedPassword = await bcrypt.hash(password, 10); 
    const imagePath = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const pdfPath = req.files["pdf"] ? `/uploads/${req.files["pdf"][0].filename}` : null;

    const numericAge = Number(age);

    const newUser = new User({ name, email, password: hashedPassword, age: numericAge, imagePath, pdfPath });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});

// ✅ Authenticate User Before Fetching Data
app.post("/api/fetch-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and Password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });

    res.json(user); 
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error while fetching user" });
  }
});


app.put("/api/update-user", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const updatedFields = { name, age };

    if (req.files["image"]) {
      updatedFields.imagePath = `/uploads/${req.files["image"][0].filename}`;
    }
    if (req.files["pdf"]) {
      updatedFields.pdfPath = `/uploads/${req.files["pdf"][0].filename}`;
    }

    const user = await User.findOneAndUpdate({ email }, updatedFields, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error while updating user" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
