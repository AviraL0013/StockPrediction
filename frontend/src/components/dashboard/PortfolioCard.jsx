import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTrendingStocks } from './topStocks'; // Import the context

const PortfolioCard = ({ stock, logo }) => {
  const [value, setValue] = useState(null); // State to store the stock price
  const [change, setChange] = useState({ raw: 0, fmt: "0.00" }); // State to store the change
  const [company, setCompany] = useState(""); // State to store the company name

  const positiveChange = change.raw >= 0;

  // Define gradient backgrounds based on performance
  const gradientClass = positiveChange
    ? 'bg-gradient-to-r from-green-400 to-green-200'
    : 'bg-gradient-to-r from-red-400 to-red-200';

  useEffect(() => {
    if (stock) {
      setCompany(stock.shortName);

      // Fetch detailed price data for the stock
      const stockUrl = `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=${stock.symbol}`;

      fetch(stockUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY, // Replace with your actual API key
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Stock data fetch failed: ' + res.statusText);
          }
          return res.json();
        })
        .then((stockData) => {
          const stockInfo = stockData?.quoteSummary?.result?.[0]?.price;
          if (stockInfo) {
            setValue(stockInfo.regularMarketPrice?.raw || null);
            setChange({
              raw: stockInfo.regularMarketChange?.raw || 0,
              fmt: stockInfo.regularMarketChange?.fmt || "0.00",
            });
          }
        })
        .catch((error) => console.error('Error fetching stock data:', error));
    }
  }, [stock]); // Re-run when stock data changes

  return (
    <div className={`rounded-lg p-4 shadow-md ${gradientClass} w-72 flex items-center`}>
      {/* Company Logo and Info */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt={`${company} logo`} className="w-12 h-12" />
        <div>
          <h4 className="text-black font-semibold">{company}</h4>
          <span className="text-sm text-gray-500">{stock.symbol}</span>
          <p className="text-gray-500 text-sm">Current Value</p>
          <h3 className="text-black font-bold">${value !== null ? value : 'Loading...'}</h3> {/* Display raw value or loading state */}

          {/* Change Indicator */}
          <div className={`text-sm ${positiveChange ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {positiveChange ? '⬆️' : '⬇️'} {change.fmt} {/* Display formatted change */}
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="ml-auto w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stock.data}>
            <Line type="monotone" dataKey="value" stroke={positiveChange ? '#4CAF50' : '#F44336'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const topStocks = useTrendingStocks(); // Fetch trending stocks from context

  return (
    <div className="flex flex-wrap gap-4">
      {topStocks.map((stock) => (
        <PortfolioCard key={stock.symbol} stock={stock} logo={stock.logo} /> // Map over topStocks to create a PortfolioCard for each stock
      ))}
    </div>
  );
};

export default Portfolio;
