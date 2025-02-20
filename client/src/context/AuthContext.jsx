// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

import axiosInstance from '../axiosInstance.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Register a User
  const register = async (userData) => {
    try {
      const res = await axiosInstance.post('/auth/register', userData);

      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  // Login a User
  const login = async (userData) => {
    try {
      const res = await axiosInstance.post('/auth/login', userData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  // Logout a User
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Fetch user data if token exist
  useEffect(() => {
    const fetchUer = async () => {
      if (token) {
        try {
          const res = await axiosInstance.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        } catch (err) {
          console.log(err?.response?.data?.message);
          logout();
        }
      }
    };
    fetchUer();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
