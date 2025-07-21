// src/pages/CreatePostPage.jsx

import React, { useState } from "react";
// useNavigate hook for programmatic navigation after post creation
import { useNavigate } from "react-router-dom";
// Import the API function to create a new post
import { createPost } from "../services/api";

/**
 * @function CreatePostPage
 * @description Provides a form for authenticated users to create and submit new blog posts.
 * Handles form input state, submission logic, loading, success, and error feedback.
 * @returns {JSX.Element} The create post page UI.
 */
const CreatePostPage = () => {
  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // State variables for displaying feedback to the user
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // To show loading state during API call

  // Initialize useNavigate hook
  const navigate = useNavigate();

  /**
   * @function handleSubmit
   * @description Handles the form submission for creating a new blog post.
   * Performs client-side validation and calls the createPost API function.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    // Clear previous feedback messages
    setError("");
    setSuccess("");
    setLoading(true); // Indicate that an operation is in progress

    try {
      // --- Client-Side Validation ---
      // Basic check to ensure all required fields are filled.
      if (!title || !description || !content) {
        setError("Please fill in all required fields.");
        setLoading(false); // Stop loading
        return; // Stop execution
      }

      // Prepare the data to be sent to the backend
      const postData = { title, description, content };
      // Call the createPost API function.
      // This function will automatically include the JWT token because 'true' was passed for requiresAuth.
      const response = await createPost(postData);

      setSuccess(response.message || "Post created successfully!");
      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setContent("");

      // Redirect the user to their "My Posts" page after successful creation.
      // Alternatively, you could redirect to the newly created post's single page:
      // navigate(`/posts/${response.blogId}`);
      navigate(`/my-posts`);
    } catch (err) {
      // Catch and display any errors returned from the API or network.
      console.error("Failed to create post:", err);
      // Use the error message from the backend if available, otherwise a generic one.
      setError(err.message || "Failed to create post. Please try again.");
    } finally {
      // Always reset loading state after the operation completes (success or failure).
      setLoading(false);
    }
  };

  return (
    // Main container for the form, centering it on the page.
    // min-h-[calc(100vh-120px)] ensures it takes up available height considering Navbar/Footer.
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-[calc(100vh-120px)]">
      {/* Form card/container with styling */}
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-2xl">
        {/* Form title */}
        <h2 className="mb-6 font-bold text-blue-700 text-3xl text-center">
          Create New Blog Post
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
          {/* Title input field */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full text-gray-700 leading-tight appearance-none"
              value={title} // Controlled component
              onChange={(e) => setTitle(e.target.value)} // Update state on change
              required
              minLength="10" // Client-side minLength for better UX
              maxLength="100" // Client-side maxLength for better UX
            />
            <p className="mt-1 text-gray-500 text-xs">
              Min 10, Max 100 characters
            </p>
          </div>

          {/* Description textarea */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="description"
            >
              Short Description
            </label>
            <textarea
              id="description"
              className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full h-24 text-gray-700 leading-tight appearance-none resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Content textarea */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700 text-sm"
              htmlFor="content"
            >
              Full Content
            </label>
            <textarea
              id="content"
              className="shadow px-3 py-2 border focus:border-blue-500 rounded focus:shadow-outline focus:outline-none w-full h-48 text-gray-700 leading-tight appearance-none resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              minLength="50" // Client-side minLength for better UX
            ></textarea>
            <p className="mt-1 text-gray-500 text-xs">Min 50 characters</p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 shadow-md px-4 py-2 rounded-md focus:shadow-outline focus:outline-none w-full font-bold text-white transition-colors duration-200"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
