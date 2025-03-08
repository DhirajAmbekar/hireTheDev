import React from 'react';

const Error = () => {
  return (
    <div className="error-page">
      <h1>404 Error: Page Not Found</h1>
      <style jsx>
        {`
          .error-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .error-page h1 {
            font-size: 36px;
            font-weight: bold;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default Error;


