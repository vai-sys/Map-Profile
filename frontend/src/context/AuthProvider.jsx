


import { useState, useEffect } from "react";

import { AuthContext } from "./AuthContext";
import api from "../../services/api";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Sending login request for:", email);
      
   
      const res = await api.post("/api/auth/login", { email, password });
      
      console.log("Login API response:", res.data);
      
      
      await fetchUser();
      return { success: true };
      
    } catch (error) {
      console.error("Login error in provider:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setLoading(true);
      await api.get("/api/auth/logout"); 
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error.message);
      
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log("Fetching current user...");
      
 
      const res = await api.get("/api/auth/me");
      
      console.log("Current user response:", res.data);
      
      
      if (res.data) {
        setUser(res.data);
        setError(null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
      setUser(null);
      if (error.response?.status !== 401) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};