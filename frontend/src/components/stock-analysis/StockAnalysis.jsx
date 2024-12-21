// components/StockAnalysis.js
import React from 'react';
import StockGraph from './stockgraph'; // Ensure you have this component
import BuySell from './BuySell';
import Sidebar from '../sidebar'; // Adjust the path as necessary
import PerformanceOverview from './PerformanceOverview';

const StockAnalysis = ({ stockSymbol }) => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white">
        {/* Top Section: Stock Graph and Buy/Sell Side by Side */}
        <div className="flex space-x-4 mb-6">
          {/* Stock Graph */}
          <div className="w-3/4 bg-gray-800 rounded-lg shadow-md p-6">
            <StockGraph stockSymbol={stockSymbol} />
          </div>

          {/* Buy/Sell Section */}
          <div className="w-1/4 bg-gray-800 rounded-lg shadow-md p-6">
            <BuySell stockSymbol={stockSymbol} />
          </div>
        </div>

        {/* Performance Overview below Stock Graph */}
        <div className="w-3/4 bg-gray-800 rounded-lg shadow-md p-6">
          <PerformanceOverview />
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
