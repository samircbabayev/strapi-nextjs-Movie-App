"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/authContext";
import Image from "next/image";
import axiosInstance from "@/utils/axiosConfig";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(`/Users/me?populate=*`);
        setData(response.data);
      } catch (error) {}
    };
    fetch();
  }, []);

  return (
    <div className="px-20 h-[90vh] py-10">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* {data && data.pic.formats.medium.url && (
            <div>
              <p>Profile Picture:</p>
              <Image
                src={data.pic.formats.medium.url}
                alt="Profile Picture"
                width={200}
                height={200}
              />
            </div>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
