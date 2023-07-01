import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SummaryPage from '../pages/SummaryPage';
import CreateUrl from '../pages/CreateUrl';
import ViewUrl from '../pages/ViewUrl';
import ProtectedRoutes from '../components/ProtectedRoutes';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<SummaryPage />} />
        <Route path=':shortURL' element={<CreateUrl />} />
        <Route path='viewURLs' element={<ViewUrl />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
