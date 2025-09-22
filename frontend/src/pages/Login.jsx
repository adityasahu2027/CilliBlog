import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authprovider";

function Login() {
    const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  

  const handleLogin = async (e) => {
    e.preventDefault();
   
   
    try {
      const { data } = await axios.post(
        "https://cilliblog-4.onrender.com/api/users/login",{email,password,role},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
      );
      console.log(data);
  // Store the token in localStorage
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success(data.message||"User login successfully",{duration:3000});
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/")
    window.location.reload(); // to reload the page after login
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
              Cilli<span className="text-blue-600">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
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
           
            <p className="text-center mb-4">
              New User?{" "}
              <Link className="text-blue-600" to="/register">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white rounded-md"
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
