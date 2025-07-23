// src/components/Navbar.jsx

import React, { useState } from "react"; // Import useState for menu toggle
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false); // Close mobile menu on logout
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  // Function to close menu when a link is clicked (useful for mobile)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="z-10 relative bg-blue-600 shadow-md p-4"> {/* Added relative and z-10 */}
      <div className="flex justify-between items-center mx-auto container">
        {/* Logo/Home Link */}
        <Link
          to="/"
          className="rounded-md font-bold text-white hover:text-blue-100 text-2xl transition-colors duration-200"
          onClick={closeMenu} // Close menu if logo is clicked
        >
          My Blog
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden"> {/* Visible only on small screens */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              // Close icon (X)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links & Auth Buttons */}
        {/* Hidden on small screens, flex on medium screens and up */}
        <div className="hidden md:flex items-center md:space-x-4">
          <Link
            to="/"
            className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
          >
            All Posts
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/create-post"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
              >
                Create Post
              </Link>
              <Link
                to="/my-posts"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
              >
                My Posts
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg">Hello, {user?.username}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 shadow-md px-4 py-2 rounded-md text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 shadow-md px-4 py-2 rounded-md text-white transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-500 hover:bg-purple-600 shadow-md px-4 py-2 rounded-md text-white transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (Hidden by default, shown when isOpen is true) */}
      {/* Absolute positioning to overlay content below, full width */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-600 w-full absolute top-full left-0 shadow-lg pb-4`}
      >
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Link
            to="/"
            className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-white text-center transition-colors duration-200"
            onClick={closeMenu}
          >
            All Posts
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/create-post"
                className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-white text-center transition-colors duration-200"
                onClick={closeMenu}
              >
                Create Post
              </Link>
              <Link
                to="/my-posts"
                className="block hover:bg-blue-700 px-3 py-2 rounded-md w-full text-white text-center transition-colors duration-200"
                onClick={closeMenu}
              >
                My Posts
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <>
              <span className="mt-4 text-white text-lg">Hello, {user?.username}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 shadow-md px-4 py-2 rounded-md w-11/12 text-white text-center transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 shadow-md px-4 py-2 rounded-md w-11/12 text-white text-center transition-colors duration-200"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-500 hover:bg-purple-600 shadow-md px-4 py-2 rounded-md w-11/12 text-white text-center transition-colors duration-200"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
