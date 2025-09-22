import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // loading state for profile check

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt"); // localStorage se token 
        console.log("Token from localStorage:", token);

        if (token) {
          const { data } = await axios.get(
            "https://cilliblog-4.onrender.com/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, //  token bhejna  hai
              },
            }
          );
          console.log("User data:", data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setProfile(null);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
        setIsAuthenticated(false);
        setProfile(null);
      } finally {
        setLoading(false); // loading khatam
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://cilliblog-4.onrender.com/api/blogs/all-blogs",
          { withCredentials: true }
        );
        console.log("Blogs:", data);
        setBlogs(data);
      } catch (error) {
        console.log("Blogs fetch error:", error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading, //  provide loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
