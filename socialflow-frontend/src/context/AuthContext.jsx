import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    // setAuthToken(localStorage.getItem("token"));
    if (token && savedUser && savedUser !== "undefined") {
      console.log("Hello");
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await authApi.signup({ name, email, password });
      // const { token, user } = response.data.data;
      let user = {
        name: response.data.data.name,
        email: response.data.data.email,
        _id: response.data.data._id,
      };
      let token = response.data.data.token;

      if (token && user) {



        // localStorage.clear();



        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      return { success: true };
    } catch (error) {
      console.error("signup failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "signup failed",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      // const { token, user } = response.data.data;
      let user = {
        name: response.data.data.name,
        email: response.data.data.email,
        _id: response.data.data._id,
      };
      let token = response.data.data.token;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      return { success: true };
    } catch (error) {
      console.error("login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      localStorage.clear();
    } catch (error) {
      console.error("logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
