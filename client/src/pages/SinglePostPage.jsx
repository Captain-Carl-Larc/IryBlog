// src/pages/SinglePostPage.jsx

import React, { useEffect, useState } from "react";
// useParams hook to extract URL parameters (like postId)
// Link component for navigation
import { useParams, Link } from "react-router-dom";
// Import the API function to fetch a single post
import { getSinglePost } from "../services/api";

/**
 * @function SinglePostPage
 * @description Displays the full content and details of a single blog post.
 * Fetches the post based on the ID provided in the URL.
 * Handles loading, error states, and displays author/date information.
 * @returns {JSX.Element} The single post page UI.
 */
const SinglePostPage = () => {
  // useParams hook extracts parameters from the URL.
  // For a route like /posts/:postId, it will give us { postId: 'actual-id-from-url' }.
  const { postId } = useParams();
  // State to store the fetched blog post data
  const [post, setPost] = useState(null);
  // State to manage loading status during API call
  const [loading, setLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook to fetch the single post when the component mounts or postId changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        // Call the API function to get a single post by its ID
        const data = await getSinglePost(postId);
        setPost(data); // Update state with fetched post data
        setError(""); // Clear any previous errors
      } catch (err) {
        // Catch and display errors from the API call
        console.error("Failed to fetch post:", err);
        setError(err.message || "Failed to fetch post.");
        setPost(null); // Clear post data on error
      } finally {
        setLoading(false); // Always set loading to false after the operation
      }
    };

    // Only attempt to fetch if postId exists (it will from the URL, but good practice)
    if (postId) {
      fetchPost(); // Invoke the fetch function
    }
  }, [postId]); // Dependency array: re-run this effect if postId changes

  // --- Conditional Rendering based on state ---

  // Show loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-gray-600 text-xl">Loading post...</p>
      </div>
    );
  }

  // Show error message if an error occurred during fetching
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-red-600 text-xl">{error}</p>
        {/* Link to go back to all posts */}
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Go to All Posts
        </Link>
      </div>
    );
  }

  // Show "Post not found" if post data is null after loading (e.g., 404 from backend)
  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)]">
        <p className="text-gray-600 text-xl">Post not found.</p>
        {/* Link to go back to all posts */}
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Go to All Posts
        </Link>
      </div>
    );
  }

  return (
    // Main container for the single post content
    <div className="mx-auto my-8 p-6 container">
      {/* Post content card with styling */}
      <div className="bg-white shadow-lg p-8 border border-gray-200 rounded-lg">
        {/* Post Title */}
        <h1 className="mb-4 font-extrabold text-gray-900 text-4xl">
          {post.title}
        </h1>
        {/* Post Description */}
        <p className="mb-6 text-gray-600 text-lg">{post.description}</p>
        {/* Author and Publish Date */}
        <div className="flex items-center mb-6 text-gray-500 text-sm">
          <span>
            By:{" "}
            <span className="font-semibold text-gray-700">
              {post.author?.username || "Unknown Author"}
            </span>
          </span>
          <span className="mx-2">•</span> {/* Separator dot */}
          <span>
            Published on: {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* Full Post Content */}
        {/* 'prose' class from Tailwind Typography plugin (if installed) for better readability of raw text */}
        <div className="max-w-none text-gray-800 leading-relaxed prose">
          <p>{post.content}</p>
          {/* If you implement a rich text editor, you might render HTML content here using dangerouslySetInnerHTML */}
          {/* Example: <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
        </div>
      </div>
      {/* Button to navigate back to all posts */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 shadow-md px-6 py-3 rounded-md text-white transition-colors duration-200"
        >
          Back to All Posts
        </Link>
      </div>
    </div>
  );
};

export default SinglePostPage;
