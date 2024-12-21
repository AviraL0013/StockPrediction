import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import Sidebar from './sidebar';
// Import the BuySell component
import BuySell from './stock-analysis/BuySell';

ChartJS.register(...registerables);

const PortfolioAnalysis = () => {
  // Data for the main portfolio chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Money Market',
        data: [100, 120, 150, 170, 200, 220, 260],
        borderColor: '#805ad5',
        backgroundColor: 'rgba(128,90,213,0.3)',
      },
      {
        label: 'Stocks',
        data: [50, 70, 90, 110, 130, 150, 170],
        borderColor: '#48bb78',
        backgroundColor: 'rgba(72,187,120,0.3)',
      },
      {
        label: 'Bonds',
        data: [80, 90, 100, 130, 160, 180, 200],
        borderColor: '#4299e1',
        backgroundColor: 'rgba(66,153,225,0.3)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data for individual holdings
  const holdingsData = [
    {
      company: "Vodafone Idea",
      shares: 1580,
      avgPrice: 11.23,
      mktPrice: 7.68,
      change: -0.28,
      changePercent: -3.52,
      totalReturn: -5609,
      returnPercent: 31.61,
      currentValue: 12134.40,
      investedValue: 17743.40,
    },
    {
      company: "Xchanging Solutions",
      shares: 50,
      avgPrice: 125.29,
      mktPrice: 111.74,
      change: 1.57,
      changePercent: 1.43,
      totalReturn: -677.50,
      returnPercent: 10.81,
      currentValue: 5587.00,
      investedValue: 6264.50,
    },
    // Additional holdings can be added here
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button className="bg-purple-600 px-4 py-2 rounded-full">Download Report</button>
          </div>

          {/* Investment Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-bold">My Investment Asset</h2>
              <p className="text-3xl mt-2">$178,975</p>
              <p className="text-green-500 mt-2">+ $150 today</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-bold">Yearly Profits</h2>
              <p className="text-3xl mt-2">$88,742</p>
              <p className="text-green-500 mt-2">+10% ($150 today)</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-bold">Profit Margin</h2>
              <p className="text-3xl mt-2">$48,632</p>
              <p className="text-red-500 mt-2">4.23% decrease</p>
            </div>
          </div>

          {/* Holdings and Buy/Sell */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Holdings */}
            <div className="bg-gray-800 p-6 rounded-lg col-span-2">
              <h2 className="text-lg font-bold">Holdings</h2>
              <table className="w-full mt-4">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">COMPANY</th>
                    <th className="py-2">MKT PRICE</th>
                    <th className="py-2">RETURNS (%)</th>
                    <th className="py-2">CURRENT</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingsData.map((holding, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4">
                        <p className="font-medium">{holding.company}</p>
                        <p className="text-xs text-gray-500">{holding.shares} shares • Avg. ₹{holding.avgPrice.toFixed(2)}</p>
                      </td>
                      <td className="py-4">
                        ₹{holding.mktPrice.toFixed(2)}
                        <p className={`text-xs ${holding.change < 0 ? "text-red-500" : "text-green-500"}`}>
                          {holding.change.toFixed(2)} ({holding.changePercent.toFixed(2)}%)
                        </p>
                      </td>
                      <td className={`py-4 ${holding.totalReturn < 0 ? "text-red-500" : "text-green-500"}`}>
                        -₹{Math.abs(holding.totalReturn).toFixed(2)}
                        <p className="text-xs">{holding.returnPercent.toFixed(2)}%</p>
                      </td>
                      <td className="py-4">₹{holding.currentValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buy/Sell Component */}
            <div className="bg-gray-800 p-6 rounded-lg">
              
              <BuySell />
            </div>
          </div>

          {/* Investment Statistics */}
          <div className="bg-gray-800 p-6 rounded-lg mt-6">
            <h2 className="text-lg font-bold mb-4">Investment Statistics</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysis;
