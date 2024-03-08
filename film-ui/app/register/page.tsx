"use client";
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Perform form validation before submitting
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/local/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registration successful", response.data);
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed: " + error.response.data.error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-64"
      >
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-sm">
        <p>
          Already registered?{" "}
          <Link href="/login" className="text-blue-500">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
