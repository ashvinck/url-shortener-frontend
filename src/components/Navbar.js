import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout Button
  const handleLogout = () => {
    const logOut = localStorage.clear();
    navigate('/');
    return logOut;
  };

  return (
    <nav className='navbar navbar-expand-xxxl navbar-light bg-light'>
      <div className='d-md-none'>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleSidebar}
          aria-label='Toggle sidebar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
      {/* --- Logo visible only above md screens --- */}
      <div className='d-none d-md-block'>
        <Link className='navbar-brand' to='/dashboard'>
          <img
            src='https://shortify.pro/img/logo192.png'
            alt='brandLogo'
            height='30'
            width='30'
          />
        </Link>
      </div>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <button className='btn btn-primary logoutBtn' onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginRight: '5px' }}
            />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
