import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Protected Routes
const ProtectedRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'));

  useEffect(() => {
    setToken(localStorage.getItem('user-token'));
  }, []);

  useEffect(() => {
    if (token === null) {
      setToken(null);
    }
  }, [token]);

  return token ? (
    <Outlet />
  ) : token === undefined ? (
    <Navigate to='/404' />
  ) : (
    <Navigate to='/' />
  );
};

export default ProtectedRoutes;
