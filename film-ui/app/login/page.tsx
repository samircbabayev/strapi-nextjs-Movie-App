"use client";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const Login = () => {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when submitting form
      const { success, response }: any = await login(formData);
      if (success) {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: " + error.response.data.error.message);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 lg:h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8 text-white">Login</h2>
      {/* Display spinner when loading */}
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 w-64"
        >
          <input
            type="text"
            name="identifier"
            onChange={handleChange}
            value={formData.identifier}
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none w-full"
          >
            Login
          </button>
        </form>
      )}
      <div className="mt-4 text-sm text-white">
        <p>
          Not a member?{" "}
          <Link href="/register" className="text-blue-500">
            Please register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
