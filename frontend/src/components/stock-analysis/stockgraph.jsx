// components/StockCard.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useSearch } from '../contexts/SearchContext';

const StockCard = () => {
  const { symbol } = useSearch();
  const { query } = useSearch(); // Get the symbol from context
  const [timeframe, setTimeframe] = useState('1D');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [price, setPrice] = useState(null);

  const updateChartData = (selectedTimeframe) => {
    const labels = {
      '1D': ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
      '5D': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      '6M': ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 (Forecast)'],
      '5Y': ['2020', '2021', '2022', '2023', '2024', '2025 (Forecast)'],
      'Max': ['2015', '2016', '2017', '2018', '2019', '2020', '2021 (Forecast)'],
    };

    const historicalData = {
      '1D': [138, 136, 134, 134, 133, 132],
      '5D': [140, 135, 138, 142, 137, 136],
      '1M': [130, 134, 136, 138, 135],
      '6M': [120, 125, 130, 128, 135, 140],
      '1Y': [100, 110, 115, 120, 118],
      '5Y': [80, 90, 100, 110, 105],
      'Max': [60, 70, 85, 100, 110, 115],
    };

    const forecastData = {
      '1D': [132, 131],
      '5D': [134, 133],
      '1M': [133, 132],
      '6M': [137, 136],
      '1Y': [115, 117],
      '5Y': [108, 109],
      'Max': [112, 110],
    };

    const historicalDataPoints = historicalData[selectedTimeframe] || [];
    const forecastDataPoints = forecastData[selectedTimeframe] || [];

    setChartData({
      labels: labels[selectedTimeframe] || [],
      datasets: [
        {
          label: `${symbol} Actual Price (INR)`,
          data: [...historicalDataPoints],
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.2)',
          fill: true,
          tension: 0.2,
        },
        {
          label: `${symbol} Predicted Price (INR)`,
          data: [historicalDataPoints[historicalDataPoints.length - 1], ...forecastDataPoints],
          borderColor: '#4ade80',
          backgroundColor: 'rgba(74, 222, 128, 0.2)',
          borderDash: [5, 5],
          fill: true,
          tension: 0.2,
        },
      ],
    });
  };

  useEffect(() => {
    updateChartData(timeframe);
  }, [timeframe, symbol]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white">
          <h1 className="text-2xl font-semibold">
            {symbol || 'Stock Symbol'}
            {query && (
              <span className="text-sm text-gray-400 ml-2">
                ({query.charAt(0).toUpperCase() + query.slice(1)})
              </span>
            )}
          </h1>

          <p className="text-3xl font-bold">{price ? `${price} INR` : 'Loading...'}</p>
        </div>
      </div>

      <div className="flex justify-start space-x-6 mb-4 border-b border-gray-600">
        {['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'Max'].map((tf) => (
          <button
            key={tf}
            className={`px-2 py-1 text-sm font-semibold ${timeframe === tf ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-96 mb-4">
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default StockCard;
