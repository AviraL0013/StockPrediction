import React, { useState } from 'react';

const BuySellComponent = () => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(880.65);
  const [activeTab, setActiveTab] = useState('buy'); // Tab for Buy/Sell
  const [tradeType, setTradeType] = useState('delivery'); // Tab for Delivery/Intraday/MTF

  return (
    <div className="max-w-sm mx-auto p-4 rounded-lg border-2 border-white bg-gray-800">
      <h2 className="text-lg font-semibold text-white">Tata Motors</h2>
      <p className="text-sm text-gray-400">
        NSE ₹842.75 (-4.06%) · BSE ₹843.05 <span className="text-blue-400 underline cursor-pointer">Depth</span>
      </p>

      {/* Buy/Sell Tabs */}
      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('buy')}
            className={`font-semibold ${
              activeTab === 'buy' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`font-semibold ${
              activeTab === 'sell' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-400'
            }`}
          >
            SELL
          </button>
        </div>
      </div>

      {/* Trade Type Tabs */}
      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setTradeType('delivery')}
            className={`font-semibold ${
              tradeType === 'delivery' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setTradeType('intraday')}
            className={`font-semibold ${
              tradeType === 'intraday' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'
            }`}
          >
            Intraday
          </button>
          <button
            onClick={() => setTradeType('mtf')}
            className={`font-semibold ${
              tradeType === 'mtf' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'
            }`}
          >
            MTF
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-300">
            Qty <span className="text-gray-400">NSE</span>
          </label>
          <input
            type="number"
            className="w-full mt-2 p-2 bg-gray-700 text-white rounded focus:outline-none"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-300">
            Price <span className="text-gray-400">Limit</span>
          </label>
          <input
            type="number"
            className="w-full mt-2 p-2 bg-gray-700 text-white rounded focus:outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Order will be executed at ₹{price.toFixed(2)} or lower price
        </p>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span>Balance : ₹21,869</span>
          <span>Approx req. : ₹0</span>
        </div>

        {/* Buy/Sell Button based on the active tab */}
        <button
          className={`w-full mt-4 py-2 font-semibold rounded-lg ${
            activeTab === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {activeTab === 'buy' ? 'BUY' : 'SELL'}
        </button>
      </div>
    </div>
  );
};

export default BuySellComponent;
