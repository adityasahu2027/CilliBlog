import { Link } from "react-router-dom";
import { useAuth } from "../context/Authprovider";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/users/logout",
        { withCredentials: true }
      );
      console.log(data);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-lg px-4 py-3 bg-white">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo */}
        <div className="font-semibold text-xl">Cilli<span className="text-blue-600">Blog</span></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>
          <Link to="/creator" className="hover:text-blue-600">Creators</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>

          
          {isAuthenticated && profile?.role === "admin" ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </Link>
            ) : (
              ""
            )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md">
              Login
            </Link>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <RxCross1 size={24} /> : <GiHamburgerMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {show && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center justify-center text-xl font-semibold space-y-6 py-8">
            <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-600">Home</Link>
            <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-600">Blogs</Link>
            <Link to="/creator" onClick={() => setShow(false)} className="hover:text-blue-600">Creators</Link>
            <Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-600">About</Link>
            <Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-600">Contact</Link>

            
            {isAuthenticated && profile?.user?.role === "admin" ? (<Link to="/dashboard" onClick={() => setShow(false)} className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md">
              Dashboard
            </Link>):("")}
            

            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setShow(false); }} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setShow(false)} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md">
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
