import React from 'react';
import { Link } from 'react-router-dom';

// Card Layout Component
const AuthCard = ({ children }) => {
  return (
    <div className='container'>
      <div className='card-wrapper'>
        <div className='card border-light'>
          <Link>
            <img
              className='brand-image'
              src='https://shortify.pro/img/logo192.png'
              alt='brandLogo'
              height='30'
              width='30'
            />
            <div className='card-heading'>Shortify</div>
          </Link>
          <p>Welcome to Shortify - The URL Shortener App</p>
          <div className='card-body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
