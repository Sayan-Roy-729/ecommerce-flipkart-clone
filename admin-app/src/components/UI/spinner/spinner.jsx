import React from 'react';

const Spinner = (props) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
