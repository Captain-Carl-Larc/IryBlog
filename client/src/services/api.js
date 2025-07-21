// src/services/api.js

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000/api"; // Make sure this matches your backend's port and base path

// Helper function to get the authorization header with the JWT token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  return token ? { Authorization: `Bearer ${token}` } : {}; // Return header if token exists
};

/**
 * @function request
 * @description Generic function to make API requests to the backend.
 * This function abstracts the fetch API, handles JSON parsing,
 * error responses, and optionally adds authentication headers.
 * @param {string} url - The full API endpoint URL (e.g., 'http://localhost:5000/api/users/register').
 * @param {string} method - HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [data] - Request body data (for POST/PUT), will be JSON.stringified.
 * @param {boolean} [requiresAuth=false] - If true, adds an Authorization: Bearer token header.
 * @returns {Promise<object>} The JSON response data from the server.
 * @throws {Error} Throws an error if the network request fails or the server
 * responds with a non-OK status (e.g., 4xx, 5xx).
 */
const request = async (url, method, data = null, requiresAuth = false) => {
  // Initialize headers with Content-Type for JSON
  const headers = {
    "Content-Type": "application/json",
  };

  // If authentication is required, merge the Authorization header
  if (requiresAuth) {
    Object.assign(headers, getAuthHeader());
  }

  // Configure the fetch request
  const config = {
    method,
    headers,
    // Add body for POST/PUT/PATCH requests
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, config); // Make the network request
    const result = await response.json(); // Parse the JSON response body

    // Check if the HTTP response status is within the success range (200-299)
    if (!response.ok) {
      // If not successful, throw an error with the server's message
      // or a generic message if none is provided.
      throw new Error(
        result.message || `HTTP error! status: ${response.status}`
      );
    }

    return result; // Return the parsed JSON data
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`API Request Error (${method} ${url}):`, error);
    // Re-throw the error so that the calling component/context can handle it
    throw error;
  }
};

// --- Specific API Call Functions ---
// These functions use the generic 'request' helper to interact with specific endpoints.

/**
 * @function registerUser
 * @description Registers a new user account.
 * @param {string} username - The username for the new account.
 * @param {string} email - The email for the new account.
 * @param {string} password - The password for the new account.
 * @returns {Promise<object>} The server's response, typically including user info and a token.
 */
export const registerUser = (username, email, password) =>
  request(`${API_BASE_URL}/users/register`, "POST", {
    username,
    email,
    password,
  });

/**
 * @function loginUser
 * @description Authenticates an existing user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The server's response, typically including user info and a token.
 */
export const loginUser = (email, password) =>
  request(`${API_BASE_URL}/users/login`, "POST", { email, password });

/**
 * @function createPost
 * @description Creates a new blog post. Requires authentication.
 * @param {object} postData - An object containing { title, description, content }.
 * @returns {Promise<object>} The created blog post data from the server.
 */
export const createPost = (postData) =>
  request(`${API_BASE_URL}/posts/create`, "POST", postData, true); // 'true' means authentication is required

/**
 * @function getAllPosts
 * @description Fetches all blog posts. Requires authentication (as per your backend setup).
 * @returns {Promise<Array<object>>} An array of blog post objects.
 */
export const getAllPosts = () =>
  request(`${API_BASE_URL}/posts`, "GET", null, true); // 'true' means authentication is required

/**
 * @function getSinglePost
 * @description Fetches a single blog post by its ID. Requires authentication.
 * @param {string} postId - The unique ID of the blog post.
 * @returns {Promise<object>} The single blog post object.
 */
export const getSinglePost = (postId) =>
  request(`${API_BASE_URL}/posts/${postId}`, "GET", null, true); // 'true' means authentication is required

/**
 * @function getMyPosts
 * @description Fetches all blog posts created by the currently logged-in user. Requires authentication.
 * @returns {Promise<Array<object>>} An array of blog post objects by the current user.
 */
export const getMyPosts = () =>
  request(`${API_BASE_URL}/posts/author`, "GET", null, true); // 'true' means authentication is required

/**
 * @function getPostsOfUser
 * @description Fetches all blog posts by a specific user ID. Requires authentication.
 * @param {string} userId - The unique ID of the user whose posts to fetch.
 * @returns {Promise<Array<object>>} An array of blog post objects by the specified user.
 */
export const getPostsOfUser = (userId) =>
  request(`${API_BASE_URL}/posts/author/${userId}`, "GET", null, true); // 'true' means authentication is required

// Placeholder for future update and delete functions
// export const updatePost = (postId, postData) =>
//   request(`${API_BASE_URL}/posts/${postId}`, 'PUT', postData, true);

export const updatePost = (postId,postData) =>{
  request(`${API_BASE_URL}/posts/${postId}`,'PUT',postData,true)
}

// export const deletePost = (postId) =>
//   request(`${API_BASE_URL}/posts/${postId}`, 'DELETE', null, true);

export const deletePost = (postId)=>{
  request(`${API_BASE_URL}/posts/${postId}`,'DELETE',null,true)
}