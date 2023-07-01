import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import VerifyUser from '../pages/VerifyUser';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='signup' element={<Register />} />
      <Route path='verify-user/:email/:token' element={<VerifyUser />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password/:_id/:token' element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
