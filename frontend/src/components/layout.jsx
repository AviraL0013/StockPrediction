import React from 'react';
import Sidebar from './sidebar'; // Adjust the import path as necessary

const Layout = ({ children }) => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar /> {/* Include Sidebar */}
      <div className="flex-1 p-8 text-white">
        {children} {/* This will render the main content for each page */}
      </div>
    </div>
  );
};

export default Layout;
