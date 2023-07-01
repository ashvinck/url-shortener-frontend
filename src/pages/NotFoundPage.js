import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='container-fluid'>
      <div className='notFound-wrapper'>
        <img
          width='50%'
          src='https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif'
          alt='404 Not Found'
        />
        <h2>Page Not Found!</h2>
      </div>
    </div>
  );
};

export default NotFoundPage;
