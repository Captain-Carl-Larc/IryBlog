// src/pages/MyPostsPage.jsx

import React, { useEffect, useState } from "react";
// Import the API function to fetch posts by the logged-in user
import { getMyPosts } from "../services/api";
// Link component for navigation (e.g., to create a new post)
import { Link } from "react-router-dom";
// useAuth hook to access authentication state (needed for protected API call)
import { useAuth } from "../context/AuthContext";

/**
 * @function MyPostsPage
 * @description Displays a list of blog posts created by the currently logged-in user.
 * Fetches posts using the authenticated user's ID.
 * Handles loading, error states, and provides a link to create new posts if none exist.
 * @returns {JSX.Element} The "My Posts" page UI.
 */
const MyPostsPage = () => {
  // State to store the fetched blog posts
  const [posts, setPosts] = useState([]);
  // State to manage loading status during API call
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState("");

  // Get authentication status from AuthContext.
  // Although this page is wrapped by <ProtectedRoute>, having an internal check
  // is good practice for clarity and robustness.
  const { isAuthenticated } = useAuth();

  // useEffect hook to fetch the logged-in user's posts when the component mounts
  // or when the authentication status changes.
  useEffect(() => {
    const fetchMyPosts = async () => {
      // If the user is not authenticated, stop loading and set an error message.
      // The <ProtectedRoute> should prevent unauthenticated access, but this is a fallback.
      if (!isAuthenticated) {
        setLoading(false);
        setError("You must be logged in to view your posts.");
        return;
      }

      try {
        setLoading(true); // Set loading to true before fetching
        // Call the API function to get posts for the authenticated user.
        // The getMyPosts function in api.js automatically includes the JWT.
        const data = await getMyPosts();
        setPosts(data); // Update state with fetched posts
        setError(""); // Clear any previous errors
      } catch (err) {
        // Catch and display errors from the API call
        console.error("Failed to fetch your posts:", err);
        setError(err.message || "Failed to fetch your posts.");
        setPosts([]); // Clear posts on error
      } finally {
        setLoading(false); // Always set loading to false after the operation
      }
    };

    fetchMyPosts(); // Invoke the fetch function
  }, [isAuthenticated]); // Dependency array: re-run this effect if isAuthenticated changes

  // --- Conditional Rendering based on state ---

  // Show loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-gray-600 text-xl">Loading your posts...</p>
      </div>
    );
  }

  // Show error message if an error occurred during fetching
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 container">
      <h1 className="mb-8 font-extrabold text-gray-900 text-4xl text-center">
        My Posts
      </h1>
      {/* Conditionally display message if no posts are available for the user */}
      {posts.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          You haven't created any posts yet.{" "}
          <Link to="/create-post" className="text-blue-600 hover:underline">
            Create one now!
          </Link>
        </p>
      ) : (
        // Grid layout for displaying post cards
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Map through the posts array and render a card for each post */}
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg hover:shadow-xl p-6 border border-gray-200 rounded-lg transition-shadow duration-300"
            >
              {/* Post Title */}
              <h2 className="mb-3 font-bold text-blue-700 text-2xl line-clamp-2">
                {post.title}
              </h2>
              {/* Post Description */}
              <p className="mb-4 text-gray-600 line-clamp-3">
                {post.description}
              </p>
              {/* Author and Date Information */}
              <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                {/* Display author, which should be the logged-in user */}
                <span>
                  By:{" "}
                  <span className="font-semibold text-gray-700">
                    {post.author?.username || "Unknown Author"}
                  </span>
                </span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              {/* Link to read the full post */}
              <Link
                to={`/posts/${post._id}`} // Navigates to the single post page using its ID
                className="inline-block bg-blue-500 hover:bg-blue-600 shadow-md px-5 py-2 rounded-md text-white transition-colors duration-200"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
