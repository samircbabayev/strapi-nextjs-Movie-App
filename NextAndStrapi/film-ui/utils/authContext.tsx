"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Define the User interface
interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean; // New field
  login: (formData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false, // Initialize isLoggedIn as false
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoggedIn = async () => {
      const jwt = Cookies.get("jwt");
      const userCookie = Cookies.get("user");
      if (jwt && userCookie) {
        // If both JWT and user cookies are present, set user and logged in status
        setUser(JSON.parse(userCookie));
        setIsLoggedIn(true);
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (formData: any) => {
    try {
      const response = await axiosInstance.post("/auth/local", formData);

      // Store JWT token and user in a cookie
      Cookies.set("jwt", response.data.jwt);
      Cookies.set("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      setLoading(false);
      console.log("Login success:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    // Clear token from cookies
    Cookies.remove("jwt");
    Cookies.remove("user");
    setUser(null);
    setIsLoggedIn(false); // Set isLoggedIn to false after logout
    setLoading(false);
    // Redirect the user to the login page after logout
    // router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
