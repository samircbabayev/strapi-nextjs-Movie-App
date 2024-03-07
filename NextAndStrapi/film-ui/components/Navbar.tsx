"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/utils/authContext";

const Navbar = () => {
  const { user, login, logout } = useAuth();
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
          <>
            <Link
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
              href={"/login"}
            >
              Login
            </Link>
            <Link
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-700 focus:outline-none"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
