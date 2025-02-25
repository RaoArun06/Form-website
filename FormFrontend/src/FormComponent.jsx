import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [pdfName, setPdfName] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("age", Number(data.age));
      formData.append("image", data.image[0]); 
      formData.append("pdf", data.pdf[0]); 

      const response = await axios.post("http://localhost:5000/api/save-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      alert("User saved successfully!");

      reset();
      setImagePreview(null);
      setPdfName("");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Fill the details</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input {...register("name", { required: "Name is required" })} placeholder="Enter your name" className="border p-2 w-full rounded-md" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register("email", { required: "Email is required" })} placeholder="Enter your email" className="border p-2 w-full rounded-md" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Age</label>
          <input type="number" {...register("age", { required: "Age must be numeric" })} placeholder="Enter your age" className="border p-2 w-full rounded-md" />
          {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload PDF</label>
          <input type="file" accept=".pdf" {...register("pdf")}  className="border p-2 w-full rounded-md text-gray-600" onChange={(e) => setPdfName(e.target.files[0]?.name || "")} />
          {pdfName && <p className="text-gray-500 text-xs mt-1">{pdfName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="border p-2 w-full rounded-md text-gray-600"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-md" />}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md w-full hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}