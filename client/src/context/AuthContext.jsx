// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
// Import the API functions from your services/api.js file
import { loginUser, registerUser } from "../services/api";

// 1. Create the AuthContext
// This is the actual Context object that components will consume.
export const AuthContext = createContext();

// 2. AuthProvider Component
// This component will wrap your entire application (or a part of it)
// and provide the authentication state and functions to its children.
export const AuthProvider = ({ children }) => {
  
  // State to hold the authenticated user's data (e.g., _id, username, email)
  const [user, setUser] = useState(null);
  
  // State to hold the JWT token
  const [token, setToken] = useState(null);
  
  // State to indicate if the authentication state is still being loaded (e.g., from localStorage)
  const [loading, setLoading] = useState(true);

  // useEffect hook to run once on component mount to check for existing session in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        // Parse stored user data (it was stringified when saved)
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        // Handle cases where localStorage data might be corrupted
        console.error("Failed to parse user data from localStorage:", error);
        // Clear invalid data to prevent persistent errors
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    // Set loading to false once the initial check is complete
    setLoading(false);
  }, []); // Empty dependency array means this effect runs only once after the initial render

  /**
   * @function login
   * @description Handles user login by calling the API and storing the token/user data.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<object>} The response data from the login API call.
   * @throws {Error} Throws an error if login fails.
   */
  const login = async (email, password) => {
    try {
      // Call the loginUser function from your API service
      const data = await loginUser(email, password);
      // Update state with user info and token
      setUser({ _id: data._id, username: data.username, email: data.email });
      setToken(data.token);
      // Persist token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          username: data.username,
          email: data.email,
        })
      );
const storedUser = localStorage.getItem('user')   ;   if(user){
        console.log(user);
      }
      console.log('stored user',storedUser)
      return data; // Return data for potential navigation or messages in the component
    } catch (error) {
      console.error("Login failed in AuthContext:", error);
      throw error; // Re-throw to be handled by the component calling login (e.g., AuthForm)
    }
  };

  /**
   * @function register
   * @description Handles user registration by calling the API and storing the token/user data.
   * @param {string} username - User's username.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise<object>} The response data from the registration API call.
   * @throws {Error} Throws an error if registration fails.
   */
  const register = async (username, email, password) => {
    try {
      // Call the registerUser function from your API service
      const data = await registerUser(username, email, password);
      // Update state with user info and token
      setUser({ _id: data._id, username: data.username, email: data.email });
      setToken(data.token);
      // Persist token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          username: data.username,
          email: data.email,
        })
      );
      return data; // Return data for potential navigation or messages in the component
    } catch (error) {
      console.error("Registration failed in AuthContext:", error);
      throw error; // Re-throw to be handled by the component calling register (e.g., AuthForm)
    }
  };

  /**
   * @function logout
   * @description Handles user logout by clearing state and localStorage.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // The value object that will be provided to all consuming components
  const authContextValue = {
    user, // Current authenticated user data
    token, // Current JWT token
    loading, // Is the initial authentication state still loading?
    login, // Function to log in
    register, // Function to register
    logout, // Function to log out
    isAuthenticated: !!token, // Convenience boolean: true if token exists, false otherwise
  };

  return (
    // Provide the authContextValue to all children components
    <AuthContext.Provider value={authContextValue}>
      {/* Render children only after the initial loading check is complete */}
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center items-center min-h-screen text-gray-600 text-xl">
          Loading authentication...
        </div>
      )}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to Consume AuthContext
// This makes it easier for components to access the context values.
export const useAuth = () => useContext(AuthContext);
