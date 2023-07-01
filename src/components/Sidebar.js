import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faScissors,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

// Sidebar Data
const SidebarData = [
  {
    name: 'Dashboard',
    icon: faTableColumns,
    to: '/dashboard',
  },
  {
    name: 'Shorten URL',
    icon: faScissors,
    to: '/dashboard/createURL',
  },
  {
    name: 'View URLs',
    icon: faFileLines,
    to: '/dashboard/viewURLs',
  },
];

const Sidebar = ({ showSidebar }) => {
  return (
    // Mapping Data and rendering Sidebar Links
    <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
      {SidebarData.map(({ name, icon, to }) => (
        <NavLink to={to} key={to} className='sidebarLink' end>
          <div className='sidelink-wrapper'>
            <div className='sidelink-icon'>
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className='sidelink-label'>{name}</div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
