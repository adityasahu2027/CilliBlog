import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/Authprovider";

function Register() {
  const {isAuthenticated, setIsAuthenticated} = useAuth();

const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandle = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        "https://cilliblog-5.onrender.com/api/users/register",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );
      console.log(data);
      toast.success(data.message||"User resisterd successfully");
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setEducation("");
      setPassword("");
      setPhone("");
      setRole("");
      setPhotoPreview("");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Please fill all the required fields")
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              Cilli<span className="text-blue-600">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option>Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div className="mb-4">
              <input
                type="text "
                placeholder="Your Name"
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                className="w-full p-2 border rounded-md"
              ></input>
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                className="w-full p-2 border rounded-md"
              ></input>
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                className="w-full p-2 border rounded-md"
              ></input>
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Enter Your Number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)} 
                className="w-full p-2 border rounded-md"
              ></input>
            </div>

            <select
              value={education}
              onChange={(e)=>setEducation(e.target.value)} 
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option>Select Your Education</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="B.Sc">Bachelor's of Science</option>
              <option value="M.Sc">Master of Science</option>
              <option value="B.Com">Bachelor's of Commerce</option>
              <option value="M.Com">Master of Commerce</option>
              <option value="B.tech">Bachelor's of Technology</option>
              <option value="M.tech">Master of technology</option>
            </select>
            <div className="flex">
              <div className="photo w-20 h-20 mr-4">
                <img src={photoPreview?`${photoPreview}`:"photo"} alt="photo" />
              </div>
              <input
                type="file"
                onChange={changePhotoHandle}
                className="w-full p-2 mb-4 border rounded-md"
              ></input>
            </div>
            <p className="text-center mb-4">
              Already register?
              <Link className="text-blue-600" to="/login">
                Login now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white rounded-md"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
