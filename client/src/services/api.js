//IN this page, I get authentication headers, set up generic request, and also individual requests

//define API_BASE_URL
const API_BASE_URL = "http://localhost:5000/api";

//get Auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: `Bearer ${token}`, //returns object
    };
  } else {
    return {};
  }
};

//set up generic request function
const request = async (url, method, data = null, requiresAuth = false) => {
  //define header
  const headers = {
    "Content-Type": "application/json",
  };

  //conditionally merge authorization header when required
  if (requiresAuth) {
    Object.assign(headers, getAuthHeader());
  }

  //create request configuration object to handle request info
  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    //perfom fetch request, return promise
    const response = await fetch(url, config);

    //jsonfy the response
    const result = await response.json();

    //check request outcome
    if (!response.ok) {
      throw new Error(response.status || response.message || result.message);
    } else {
      return result;
    }
  } catch (error) {
    console.error(error.message);
    throw new Error(
      error.message || "could not perform the request successfully."
    );
  }
};

//DEFINE A FUNCTION FOR EACH ROLE
//1. TO register users

export function registerUser(username, email, password) {
  return request(`${API_BASE_URL}/users/register`, "POST", {
    email,
    username,
    password,
  });
}

export function loginUser(email, password) {
  return request(`${API_BASE_URL}/users/login`, "POST", {
    email,
    password,
  });
}

export function createPost(postData) {
  return request(`${API_BASE_URL}/posts/create`, "POST", postData, true);
}

export function getAllPosts() {
  return request(`${API_BASE_URL}/posts`, "GET", null, true);
}

export function getSinglePost(postId) {
  return request(`${API_BASE_URL}/posts/${postId}`, "GET", null, true);
}

export function getMyPosts() {
  return request(`${API_BASE_URL}/posts/author`, "GET", null, true);
}

export function getPostsOfUser(userId) {
  return request(`${API_BASE_URL}/posts/author/${userId}`, "GET", null, true);
}

export function updatePost(postId, postData) {
  return request(`${API_BASE_URL}/posts/${postId}`, "PUT", postData, true);
}

export function deletePost(postId) {
  return request(`${API_BASE_URL}/posts/${postId}`, "DELETE", null, true);
}
