import React, { useState } from "react";
import { useAuth } from "../context/Authprovider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TiThMenu } from "react-icons/ti";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponent = (value) => {
    setComponent(value);
    if (window.innerWidth < 640) setShow(false);
  };

  const gotoHome = () => {
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("https://cilliblog-6.onrender.com/api/users/logout", {
        withCredentials: true,
      });
      toast.success("User logout successfully");
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error while logout");
    }
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer bg-white p-2 rounded-lg shadow-md"
        onClick={() => setShow(!show)}
      >
        <TiThMenu className="text-2xl text-gray-800" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-full fixed top-0 left-0 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl transform transition-transform duration-300 z-40
        ${show ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Profile */}
        <div className="flex flex-col items-center mt-10 space-y-3">
          <img
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            src={profile?.photo?.url}
            alt="profile"
          />
          <p className="text-lg font-semibold">{profile?.name || "User"}</p>
          <span className="text-sm text-gray-200 bg-white/20 px-3 py-1 rounded-full">
            {profile?.email || "user@example.com"}
          </span>
        </div>

        {/* Buttons */}
        <ul className="space-y-4 mt-10 px-4 font-medium">
          <button
            onClick={() => handleComponent("My Blog")}
            className="w-full py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition duration-300 shadow-md"
          >
            📘 My Blog
          </button>
          <button
            onClick={() => handleComponent("Create Blog")}
            className="w-full py-2 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition duration-300 shadow-md"
          >
            ✍️ Create Blog
          </button>
          <button
            onClick={() => handleComponent("My Profile")}
            className="w-full py-2 rounded-lg bg-white text-pink-700 font-semibold hover:bg-pink-100 transition duration-300 shadow-md"
          >
            👤 My Profile
          </button>
          <button
            onClick={gotoHome}
            className="w-full py-2 rounded-lg bg-white text-red-700 font-semibold hover:bg-red-100 transition duration-300 shadow-md"
          >
            🏠 Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-white text-yellow-700 font-semibold hover:bg-yellow-100 transition duration-300 shadow-md"
          >
            🚪 Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
