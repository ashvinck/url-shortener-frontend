import React from 'react';

// Loading Component
const Loading = () => {
  return (
    <div className='container-fluid'>
      <div className='backdrop'>
        <div className='loading-wrapper'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
