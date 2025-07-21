// src/components/ProtectedRoute.jsx

import React from "react";
// Navigate is used to programmatically redirect the user to a different route.
import { Navigate } from "react-router-dom";
// useAuth hook provides access to the authentication state from AuthContext.
import { useAuth } from "../context/AuthContext";

/**
 * @function ProtectedRoute
 * @description A component that protects its children routes from unauthenticated access.
 * If the user is not authenticated, it redirects them to the login page.
 * @param {object} { children } - The React children (components) that this route protects.
 * @returns {JSX.Element} The children components if authenticated, or a Navigate component for redirection.
 */
const ProtectedRoute = ({ children }) => {
  // Destructure isAuthenticated and loading from the AuthContext.
  // isAuthenticated: boolean indicating if a token and user exist.
  // loading: boolean indicating if the initial authentication check (from localStorage) is still in progress.
  const { isAuthenticated, loading } = useAuth();

  // If the authentication state is still loading (e.g., checking localStorage),
  // display a loading message or spinner. This prevents a flicker where
  // the user might briefly see the protected content before being redirected.
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-xl">Loading...</p>{" "}
        {/* You can replace this with a spinner */}
      </div>
    );
  }

  // If the initial loading is complete AND the user is NOT authenticated,
  // redirect them to the login page.
  // 'replace' prop ensures that the login page replaces the current entry in the history stack,
  // so the user can't just hit back to get to the protected page.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user IS authenticated, render the children components (the actual protected page).
  return children;
};

export default ProtectedRoute;
