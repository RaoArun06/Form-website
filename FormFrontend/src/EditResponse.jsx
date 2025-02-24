import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Fetching data for:", data.email);

    try {
      const response = await axios.post("http://localhost:5000/api/fetch-user", {
        email: data.email,
      });

      console.log("Response from backend for: ", response.data.email);
      console.log(response.data.name);
      console.log(response.data.age);
      console.log("http://localhost:5000"+response.data.imagePath);
      console.log("http://localhost:5000"+response.data.pdfPath);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center h-screen">
      <h2 className="text-lg font-bold mb-4">Fetch User Data</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 w-96">
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
          className="border p-2 rounded w-full mb-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Fetch Data
        </button>
      </form>
    </div>
  );
};

export default EditForm;
