import Link from "next/link";
import React from "react";

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
