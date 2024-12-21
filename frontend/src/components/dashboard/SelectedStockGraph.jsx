import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockCard = ({ stockData }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [price, setPrice] = useState(null);
  const [previousClose, setPreviousClose] = useState(null);
  const [change, setChange] = useState(null);
  const [openPrice, setOpenPrice] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [peRatio, setPeRatio] = useState(null);
  const [divYield, setDivYield] = useState(null);
  

  // Fetch stock price data when the component mounts
  useEffect(() => {
    const fetchStockPrice = async () => {
      const url = 'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=PYPL';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY, // Replace with your actual API key
          },
        });

        if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);

        const data = await response.json();
        const result = data?.quoteSummary?.result;

        if (result && result.length > 0) {
          const priceData = result[0].price;

          if (priceData) {
            setPrice(priceData.regularMarketPrice?.raw);
            setPreviousClose(priceData.regularMarketPreviousClose?.raw);
            setChange(priceData.regularMarketChange?.raw);
            setOpenPrice(priceData.regularMarketOpen?.raw);
            setMarketCap(priceData.marketCap?.raw);
            setHigh(priceData.regularMarketDayHigh?.raw);
            setLow(priceData.regularMarketDayLow?.raw);
            setPeRatio(priceData.trailingPE?.raw);
            setDivYield(priceData.trailingAnnualDividendYield?.raw);
          }
        } else {
          console.log('No results found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStockPrice();
  }, []);

  // Update chart data based on selected timeframe
  const updateChartData = (selectedTimeframe) => {
    const labels = {
      '1D': ['10 AM', '11 AM', '12 PM', '1 PM'],
      '5D': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      '6M': ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4'],
      '5Y': ['2020', '2021', '2022', '2023', '2024'],
      'Max': ['2015', '2016', '2017', '2018', '2019', '2020'],
    };

    const dataPoints = stockData.data[selectedTimeframe]?.map((point) => point.value) || [138, 136, 134, 134];

    setChartData({
      labels: labels[selectedTimeframe],
      datasets: [
        {
          label: `${stockData.company} Stock Price (INR)`,
          data: dataPoints,
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  useEffect(() => {
    updateChartData(timeframe);
  }, [timeframe, stockData]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: false },
        grid: { display: false },
        ticks: { color: '#e5e7eb' },
      },
      y: {
        ticks: { stepSize: 2, color: '#e5e7eb' },
        grid: { color: '#374151' },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white">
          <h1 className="text-xl font-semibold">{stockData.company}</h1>
          <p className="text-3xl font-bold">{price ? `${price} INR` : 'Loading...'}</p>
          <p className="text-red-500">-4.33 INR (-3.11%) today</p>
          <p className="text-sm text-gray-400">25 Oct, 12:36 PM IST</p>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">+ Follow</button>
        </div>
      </div>

      <div className="flex justify-start space-x-6 mb-4 border-b border-gray-600">
        {['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'].map((tf) => (
          <button
            key={tf}
            className={`px-2 py-1 text-sm font-semibold ${timeframe === tf ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-80 mb-4">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <p><strong>Previous Close:</strong> {previousClose ? `${previousClose} INR` : 'Loading...'}</p>
        <p><strong>Current Price:</strong> {price ? `${price} INR` : 'Loading...'}</p>
        <p><strong>Change:</strong> {change ? `${change} INR` : 'Loading...'}</p>
        <p><strong>Open:</strong> {openPrice ? `${openPrice} INR` : 'Loading...'}</p>
        <p><strong>Market Cap:</strong> {marketCap ? `${marketCap} INR` : 'Loading...'}</p>
        <p><strong>High:</strong> {high ? `${high} INR` : 'Loading...'}</p>
        <p><strong>P/E Ratio:</strong> {peRatio ? `${peRatio}` : 'Loading...'}</p>
        <p><strong>Low:</strong> {low ? `${low} INR` : 'Loading...'}</p>
        <p><strong>Dividend Yield:</strong> {divYield ? `${divYield}%` : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default StockCard;







/* <p><strong>Div yield:</strong> {stockData.divYield}</p>
        <p><strong>52-wk high:</strong> {stockData.week52High}</p>
        <p><strong>52-wk low:</strong> {stockData.week52Low}</p> */