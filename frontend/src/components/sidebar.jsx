import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 min-h-screen p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="block text-white hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/portfolio" className="block text-white hover:bg-gray-700 p-2 rounded">Portfolio</Link>
        </li>
        <li>
          <Link to="/news" className="block text-white hover:bg-gray-700 p-2 rounded">News</Link>
        </li>
        <li>
          <Link to="/account" className="block text-white hover:bg-gray-700 p-2 rounded">Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
