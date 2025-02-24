const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
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

app.post("/api/fetch-user", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user); 
    res.json(user); 
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error while fetching user" });
  }
});


app.post("/api/save-user", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const imagePath = req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : null;
    const pdfPath = req.files["pdf"] ? `/uploads/${req.files["pdf"][0].filename}` : null;

    const newUser = new User({ name, email, age, imagePath, pdfPath });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
