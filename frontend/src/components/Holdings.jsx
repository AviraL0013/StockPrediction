import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Holdings = () => {
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
      sparkData: [10, 9, 8, 7, 7.5, 7.2, 7.68]
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
      sparkData: [120, 115, 110, 108, 112, 115, 111.74]
    },
    // More stock data here...
  ];

  const getChartData = (data) => ({
    labels: data.map((_, i) => `Day ${i + 1}`),  // Generates labels like Day 1, Day 2, ...
    datasets: [
      {
        label: "Price",
        data: data,
        fill: false,
        borderColor: "#4caf50",  // Line color (green)
        backgroundColor: "#4caf50",
        tension: 0.3,  // Smooth line
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false  // Hide x-axis labels
      },
      y: {
        display: false  // Hide y-axis labels
      }
    },
    elements: {
      point: {
        radius: 0  // Hide data points
      }
    },
    plugins: {
      legend: {
        display: false  // Hide the legend
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-bold">₹56,210</p>
          <p className="text-gray-500 text-sm">Current Value</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Invested Value</p>
          <p>₹66,589</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Total Returns</p>
          <p className="text-red-500">-₹10,379 (15.59%)</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">1D Returns</p>
          <p className="text-green-500">+₹679 (1.22%)</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <button className="px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded">Activate DDPI</button>
        <button className="px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded">Verify Holdings</button>
        <button className="px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-600 rounded">All Stock SIPs</button>
      </div>

      <table className="w-full">
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
                <div className="flex items-center">
                  <div className="w-16 h-8 mr-3">
                    <Line
                      data={getChartData(holding.sparkData)}
                      options={chartOptions}
                      width={80}
                      height={32}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{holding.company}</p>
                    <p className="text-xs text-gray-500">{holding.shares} shares • Avg. ₹{holding.avgPrice.toFixed(2)}</p>
                  </div>
                </div>
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
  );
};

export default Holdings;
