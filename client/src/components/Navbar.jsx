// src/components/Navbar.jsx

import React from "react";
// Link is used for client-side navigation without full page reloads.
// useNavigate is a hook to programmatically navigate users.
import { Link, useNavigate } from "react-router-dom";
// useAuth hook provides access to the authentication state and functions (login, logout, user).
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // Destructure necessary values from the authentication context.
  const { isAuthenticated, user, logout } = useAuth();
  // Initialize useNavigate hook for redirection after logout.
  const navigate = useNavigate();

  // Function to handle user logout.
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext to clear state and localStorage.
    navigate("/login"); // Redirect the user to the login page after logging out.
  };

  return (
    // Navigation bar container with Tailwind CSS for styling.
    // bg-blue-600: blue background
    // p-4: padding
    // shadow-md: medium shadow below the navbar
    <nav className="bg-blue-600 shadow-md p-4">
      {/* Container for content inside the navbar, centered and with flexbox for alignment. */}
      <div className="flex justify-between items-center mx-auto container">
        {/* Logo/Home Link */}
        <Link
          to="/" // Navigates to the home page
          className="rounded-md font-bold text-white hover:text-blue-100 text-2xl transition-colors duration-200"
        >
          My Blog
        </Link>

        {/* Navigation Links - displayed based on authentication status */}
        <div className="flex space-x-4">
          {/* Link to view all posts (accessible to all, but content might be protected) */}
          <Link
            to="/"
            className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
          >
            All Posts
          </Link>

          {/* Conditional rendering: Only show these links if the user is authenticated */}
          {isAuthenticated && (
            <>
              {/* Link to the page for creating a new post */}
              <Link
                to="/create-post"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
              >
                Create Post
              </Link>
              {/* Link to view posts created by the logged-in user */}
              <Link
                to="/my-posts"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-white transition-colors duration-200"
              >
                My Posts
              </Link>
            </>
          )}
        </div>

        {/* Authentication Buttons (Login/Register or User/Logout) */}
        <div>
          {isAuthenticated ? (
            // If authenticated, display user's username and a logout button
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg">
                Hello, {user.username}!
              </span>
              <button
                onClick={handleLogout} // Calls the logout function
                className="bg-red-500 hover:bg-red-600 shadow-md px-4 py-2 rounded-md text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            // If not authenticated, display login and register links
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
    </nav>
  );
};

export default Navbar;
