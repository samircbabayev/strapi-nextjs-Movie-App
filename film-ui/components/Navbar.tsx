"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/contexts/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between h-16 px-4 bg-white shadow-md md:px-20">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
          LOGO
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/films" className="nav-link">
          Films
        </Link>
        {user ? (
          <>
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
            <div onClick={handleLogout} className="nav-link cursor-pointer">
              Logout
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex flex-col items-center pt-16">
            <Link href="/" className="nav-link-mobile" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/films"
              className="nav-link-mobile"
              onClick={toggleMenu}
            >
              Films
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="nav-link-mobile"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <div
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="nav-link-mobile cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="nav-link-mobile"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="nav-link-mobile"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <button
            className="absolute top-4 right-4 text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
