import React, { useState } from 'react';
import PortfolioCard from './PortfolioCard'; // Import your PortfolioCard component
import AppleStockCard from './AppleStockCard'; // Import your AppleStockCard component

const PortfolioDashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null); // State to hold selected stock

  // Sample stock data
  const stockList = [
    {
      company: "Apple Inc",
      ticker: "AAPL",
      logo: "https://logo.clearbit.com/apple.com",
      data: [
        { value: 150 },
        { value: 160 },
        { value: 155 },
        { value: 170 },
        { value: 180 },
        { value: 175 },
        { value: 185 }
      ]
    },
    {
      company: "Microsoft Corp",
      ticker: "MSFT",
      logo: "https://logo.clearbit.com/microsoft.com",
      data: [
        { value: 250 },
        { value: 260 },
        { value: 255 },
        { value: 270 },
        { value: 280 },
        { value: 275 },
        { value: 285 }
      ]
    },
    // Add more stocks as needed
  ];

  // Handle card click to update selected stock
  const handleCardClick = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        {stockList.map((stock) => (
          <PortfolioCard
            key={stock.ticker}
            company={stock.company}
            ticker={stock.ticker}
            logo={stock.logo}
            data={stock.data}
            onClick={() => handleCardClick(stock)} // Pass click handler
          />
        ))}
      </div>

      {/* Display the Apple Stock Card with selected stock data */}
      {selectedStock && (
        <AppleStockCard stockData={selectedStock} />
      )}
    </div>
  );
};

export default PortfolioDashboard;
