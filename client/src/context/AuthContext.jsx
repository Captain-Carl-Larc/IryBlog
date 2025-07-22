//import state and context from react
import { useState, useEffect, createContext, useContext } from "react";

//imports of : login,register from SERVICES
import { loginUser, registerUser } from "../services/api";

//inittialize context using createContext
export const AuthContext = createContext();

//create authprovider function
export const AuthProvider = ({ children }) => {
  //context states
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //check existing state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(error.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  //login funct
  const login = async (email, password) => {
    try {
      //call login service function
      const data = await loginUser(email, password);

      //update state
      setToken(data.token);
      setUser({ email: data.email, username: data.username, _id: data._id });

      //store in localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          username: data.username,
          _id: data._id,
        })
      );

      //return data
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const data = await registerUser(username, email, password);

      //update state
      setToken(data.token);
      setUser({ username: data.username, email: data.email, _id: data._id });

      //localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
          _id: data._id,
        })
      );
      return data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  //logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };
  const authContextValue = {
    login,
    register,
    logout,
    user,
    token,
    loading,
    isAuthenticated: !!token,
  };

  //return authprovider
  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading ? children : <p>loading...</p>}
    </AuthContext.Provider>
  );
};

//create hook to allow consumption of context
export const useAuth = ()=>useContext(AuthContext)