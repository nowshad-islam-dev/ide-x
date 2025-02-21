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
    setUser(null);
  };

  // Fetch user data if token exist
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      let isMounted = true; // Prevent state update on unmounted component

      try {
        const res = await axiosInstance.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        console.error(
          'Error fetching user:',
          err?.response?.data?.message || err
        );
        logout();
      }

      return () => {
        isMounted = false; // Cleanup function
      };
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
