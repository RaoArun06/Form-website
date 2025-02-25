# 📝 Form Website with User Update Feature

A full-stack form submission and user management system built with **React, Express.js, MongoDB, and Multer**. This project allows users to submit their details, upload images and PDFs, fetch their saved data, edit it, and update it in the database.

---

## 🚀 Features
✅ User Registration with **Name, Email, Age, Image, and PDF Upload**  
✅ Fetch User Data by Email  
✅ **Edit and Update User Details**  
✅ Image & PDF Preview Before Submission  
✅ **Multer for File Uploads** (Stores files in `/uploads`)  
✅ **MongoDB for Data Storage**  

---

## 📂 Project Structure
Form-website/ 
│-- Backend/
│ │-- model/
│ │ ├── User.js
│ │-- server.js

│-- FormFrontend/
│ │-- src/
│ │ ├── FormComponent.jsx → Handles user registration with file upload.
│ │ ├── EditResponse.jsx → Fetches and updates user details.
│ │ ├── App.js
│ │ ├── index.js
│-- README.md


🏗️ Built With
Frontend: React.js (React Hook Form), Tailwind CSS
Backend: Express.js, Node.js
Database: MongoDB (Mongoose)
File Uploads: Multer
