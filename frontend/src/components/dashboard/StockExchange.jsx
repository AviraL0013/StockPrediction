// StockExchange.js
import React from 'react';

const StockExchange = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full md:w-1/2">
      <div className="text-center">
        <h2 className="text-xl font-bold">$1,211.09</h2>
        <p className="text-gray-400">02:45 PM 11/08</p>
        <div className="text-green-500 font-bold text-lg">+8.5%</div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-400">6Month Return</p>
            <p className="text-red-500">-8.5%</p>
          </div>
          <div>
            <p className="text-gray-400">1Year Return</p>
            <p className="text-green-500">+8.5%</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <p>Daily Open: 6180.90</p>
          <p>Daily High: 6191.22</p>
          <p>Daily Low: 2231.22</p>
        </div>
      </div>
    </div>
  );
};

export default StockExchange;
