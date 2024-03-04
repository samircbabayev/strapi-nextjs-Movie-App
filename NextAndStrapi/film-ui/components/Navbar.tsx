"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token is set
    const jwtToken = Cookies.get("jwt");
    if (jwtToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/local", {
        identifier: formData.identifier,
        password: formData.password,
      });
      console.log("Login success:", response.data);

      // Store JWT token in a cookie
      Cookies.set("id", response.data.user.id);
      Cookies.set("username", response.data.user.username);
      Cookies.set("jwt", response.data.jwt);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    // Clear token from cookies
    Cookies.remove("id");
    Cookies.remove("username");
    Cookies.remove("jwt");

    setIsAuthenticated(false); // Set authentication state to false
    // router.push("/"); // Redirect to home page after logout
  };

  return (
    <nav className="flex items-center justify-between py-4 px-20 bg-white shadow">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
          LOGO
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href={"/"}
          className="text-lg text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          href={"/films"}
          className="text-lg text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Films
        </Link>
        {isAuthenticated ? (
          <>
            <Link
              href={"/profile"}
              className="text-lg text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Profile
            </Link>
            <div
              onClick={logout}
              className="text-lg text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out cursor-pointer"
            >
              Logout
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              name="identifier"
              onChange={handleChange}
              value={formData.identifier}
              placeholder="Username"
              required
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
              required
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
