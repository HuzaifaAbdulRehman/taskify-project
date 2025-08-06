// src/contexts/AuthContext.jsx
import { useState, useEffect } from "react";
import apiService from "../services/api";
import { AuthContext } from "./AuthContextContext"; // updated import ✅

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser(response.data);
          } else {
            apiService.removeAuthToken();
          }
        } catch (error) {
          console.error("Auth check error:", error);
          apiService.removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      if (response.success) {
        setUser(response.user);
        apiService.setAuthToken(response.token);
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  // Direct login with token and user data (for signup flow)
  const loginWithToken = (token, userData) => {
    setUser(userData);
    apiService.setAuthToken(token);
  };

  const register = async (name, email, password) => {
    try {
      const response = await apiService.register(name, email, password);
      if (response.success) {
        setUser(response.user);
        apiService.setAuthToken(response.token);
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      apiService.removeAuthToken();
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await apiService.updateProfile(userData);
      if (response.success) {
        setUser(response.data);
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await apiService.changePassword(
        currentPassword,
        newPassword
      );
      if (response.success) {
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("Change password error:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithToken,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
