// src/pages/AuthForm.jsx

import React, { useState } from "react";
// useLocation: Hook to get the current URL location object.
// useNavigate: Hook to programmatically navigate to different routes.
// Link: Component for declarative navigation.
import { useLocation, useNavigate, Link } from "react-router-dom";
// useAuth: Custom hook to access the authentication context (login, register functions, etc.).
import { useAuth } from "../context/AuthContext";

/**
 * @function AuthForm
 * @description A component that renders either a login or registration form
 * based on the current URL path. It handles form state, submission,
 * client-side validation, and interaction with the authentication context.
 * @returns {JSX.Element} The authentication form UI.
 */
const AuthForm = () => {
  // State variables for form inputs
  const [username, setUsername] = useState(""); // Only for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only for registration confirmation

  // State variables for displaying feedback to the user
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success messages
  const [loading, setLoading] = useState(false); // To show loading state during API calls

  // Hooks for navigation and authentication context
  const { login, register } = useAuth(); // Get login and register functions from AuthContext
  const navigate = useNavigate(); // For redirecting after success
  const location = useLocation(); // To determine if it's login or register page

  // Determine if the current form is for login based on the URL path
  const isLogin = location.pathname === "/login";

  /**
   * @function handleSubmit
   * @description Handles the form submission for both login and registration.
   * Performs client-side validation and calls the appropriate authentication function.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)

    // Clear previous feedback messages
    setError("");
    setSuccess("");
    setLoading(true); // Indicate that an operation is in progress

    try {
      // --- Client-Side Validation for Registration ---
      // This block only runs if it's the registration form.
      if (!isLogin) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false); // Stop loading
          return; // Stop execution
        }
        // Basic password length validation (matches backend schema minlength)
        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }
      }

      // --- Call Authentication Function based on Form Type ---
      if (isLogin) {
        // Call the login function from AuthContext
        await login(email, password);
        setSuccess("Login successful!");
      } else {
        // Call the register function from AuthContext
        await register(username, email, password);
        setSuccess("Registration successful! You are now logged in.");
      }

      // On successful login/registration, redirect to the home page.
      navigate("/");
    } catch (err) {
      // Catch and display any errors returned from the API or network.
      console.error("Authentication failed:", err);
      // Use the error message from the backend if available, otherwise a generic one.
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      // Always reset loading state after the operation completes (success or failure).
      setLoading(false);
    }
  };

  return (
    // Main container for the form, centering it on the page.
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      {/* Form card/container with styling */}
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md">
        {/* Form title */}
        <h2 className="mb-6 font-bold text-blue-700 text-3xl text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Error message display */}
        {error && (
          <div
            className="relative bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
        {/* Success message display */}
        {success && (
          <div
            className="relative bg-green-100 mb-4 px-4 py-3 border border-green-400 rounded text-green-700"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">{success}</span>
          </div>
        )}

        {/* The actual form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username field (only for registration) */}
          {!isLogin && (
            <div>
              <label
                className="block mb-2 font-bold text-gray-700 text-sm"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full text-gray-700 leading-tight appearance-none"
                value={username} // Controlled component: value tied to state
                onChange={(e) => setUsername(e.target.value)} // Update state on change
                required={!isLogin} // Required only if it's a registration form
              />
            </div>
          )}
          {/* Email field (for both login and registration) */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full text-gray-700 leading-tight appearance-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password field (for both login and registration) */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full text-gray-700 leading-tight appearance-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Confirm Password field (only for registration) */}
          {!isLogin && (
            <div>
              <label
                className="block mb-2 font-bold text-gray-700 text-sm"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full text-gray-700 leading-tight appearance-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 shadow-md px-4 py-2 rounded-md focus:shadow-outline focus:outline-none w-full font-bold text-white transition-colors duration-200"
            disabled={loading} // Disable button while loading to prevent multiple submissions
          >
            {/* Dynamic button text based on form type and loading state */}
            {loading
              ? isLogin
                ? "Logging In..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* Link to switch between login and registration forms */}
        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
