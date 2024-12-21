import React from 'react';
import Sidebar from './sidebar'; // Import Sidebar component

const Account = () => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Account Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p>This is the Account page.</p>
      </div>
    </div>
  );
};

export default Account;
