"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/utils/authContext"; // Adjust the path as per your file structure
import axiosInstance from "@/utils/axiosConfig";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    logout();
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
        {user ? (
          <>
            <Link
              href={"/profile"}
              className="text-lg text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Profile
            </Link>
            <div
              onClick={handleLogout}
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
