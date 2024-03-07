"use client";
import React from "react";
import { useAuth } from "@/utils/authContext";
import Image from "next/image";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="px-20 h-[90vh] py-10">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add additional profile information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
