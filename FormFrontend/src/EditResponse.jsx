import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditResponse = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPath, setPdfPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchUserData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/fetch-user", { email });
      if (response.data) {
        setUserData(response.data);
        reset(response.data); 

        if (response.data.imagePath) {
          setImagePreview(`http://localhost:5000${response.data.imagePath}`);
        }
        if (response.data.pdfPath) {
          setPdfPath(`http://localhost:5000${response.data.pdfPath}`);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "User not found");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("email", email); 
      if (data.image[0]) formData.append("image", data.image[0]);
      if (data.pdf[0]) formData.append("pdf", data.pdf[0]);

      const response = await axios.put("http://localhost:5000/api/update-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Update Success:", response.data);
      alert("User updated successfully!");
      setUserData(null); 
      setEmail(""); 
      reset(); 
    } catch (err) {
      console.error("Update Error:", err.response?.data || "Error updating user");
      alert("Failed to update user.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Fetch & Edit User Data</h2>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={fetchUserData} className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Edit User Details</h3>

          {imagePreview && (
            <div className="mb-2">
              <p className="text-gray-600">Current Profile Image:</p>
              <img src={imagePreview} alt="User Profile" className="w-32 h-32 rounded-md" />
            </div>
          )}

          {pdfPath && (
            <div className="mb-2">
              <p className="text-gray-600">Uploaded PDF:</p>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View PDF
              </a>
            </div>
          )}

          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="border p-2 rounded w-full mb-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="number"
            placeholder="Age"
            {...register("age")}
            className="border p-2 rounded w-full mb-2"
          />

          <label className="block text-sm font-medium">Upload New Image</label>
          <input type="file" accept="image/*" {...register("image")} className="border p-2 w-full rounded-md text-gray-600" />

          <label className="block text-sm font-medium">Upload New PDF</label>
          <input type="file" accept=".pdf" {...register("pdf")} className="border p-2 w-full rounded-md text-gray-600" />

          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full mt-4">
            Update Data
          </button>
        </form>
      )}
    </div>
  );
};

export default EditResponse;
