//define base URL
const API_BASE_URL = "http://localhost:500/api";

//get jwt from local storage, for use in requests which user must be authenticated

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

//Generic request function

const request = async (url, method, data = null, requiresAuth = false) => {
  //set headers
  const headers = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    Object.assign(headers, getAuthHeader());
  }

  //configure the request
  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "response not ok.");
    }

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

//specific functions

//1. register
export const registerUser = (username, email, password) => {
  request(`${API_BASE_URL}/users/register`, "POST", {
    username,
    email,
    password,
  });
};

//2. login
export const login = (email, password) => {
  request(`${API_BASE_URL}/users/login`, "POST", {
    email,
    password,
  });
};

export const getMyPosts = ()
