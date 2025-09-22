import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-600 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-3">Cilli<span className="text-blue-600">Blog</span></h1>
          <p className="text-sm leading-6">
            Sharing thoughts, ideas, and stories with the world.  
            A place where knowledge meets creativity.
          </p>
        </div>

        {/* Middle Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-white transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Socials */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-5 text-2xl">
            <a className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a className="hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500 text-center py-4 text-sm text-gray-900">
        © {new Date().getFullYear()} CilliBlog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
