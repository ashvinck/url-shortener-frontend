import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DashboardRoutes from '../routes/DashboardRoutes';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  // for viewing sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  // To toggle menu button
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='container-fluid dashboard'>
        {/* --- visible only upto md screens --- */}
        <div className='d-md-none'>
          <div className='row'>
            <Sidebar showSidebar={showSidebar} />
            <div className='main'>
              <DashboardRoutes />
              <Outlet />
            </div>
          </div>
        </div>
        {/* ---- visible only above md screens ---- */}
        <div className='d-none d-md-block'>
          <div className='row'>
            <div className='sidebar-wrapper col'>
              <Sidebar showSidebar={true} />
            </div>
            <div className='main-wrapper'>
              <div className='main'>
                <DashboardRoutes />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
