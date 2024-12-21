import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import PortfolioCard from "./PortfolioCard";
import SectorPieChart from "./SectorPieChart";
import Wishlist from "./Wishlist";
import StockCard from "./SelectedStockGraph";
import StockExchange from "./StockExchange";
import Transaction from "./Transaction";
import SearchButton from "./Search";
import LoginPage from "../Signup/LoginPage"; // Ensure this import is correct
import { useUser } from "../contexts/UserContext";
import { isTokenExpired } from "../../utils/tokenUtils";

const portfolioData = [
  {
    company: 'Apple Inc',
    ticker: 'AAPL',
    value: 203.65,
    change: 111.01,
    data: {
      '1D': [{ value: 200 }, { value: 202 }, { value: 204 }, { value: 203 }],
      '5D': [{ value: 198 }, { value: 201 }, { value: 205 }, { value: 203 }],
      '1M': [{ value: 190 }, { value: 195 }, { value: 200 }, { value: 203 }],
      '6M': [{ value: 180 }, { value: 185 }, { value: 190 }, { value: 203 }],
      '1Y': [{ value: 150 }, { value: 175 }, { value: 190 }, { value: 203 }],
      '5Y': [{ value: 120 }, { value: 150 }, { value: 180 }, { value: 203 }],
      'Max': [{ value: 50 }, { value: 100 }, { value: 150 }, { value: 203 }],
    },
    logo: 'https://logo.clearbit.com/apple.com',
    previousClose: 199.00,
    open: 202.00,
    marketCap: '3.2T',
    high: 205.00,
    low: 198.00,
    peRatio: 28.50,
    divYield: '1.2%',
    week52High: 220.00,
    week52Low: 160.00,
  },
  // Add more stocks if needed
];

const sectorData = [
  { sector: 'Technology', value: 600 },
  { sector: 'E-Commerce', value: 300 },
  { sector: 'Finance', value: 200 },
];

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(portfolioData[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, setUser } = useUser();

  // Check localStorage for saved user and token expiration on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && isTokenExpired(savedUser.token)) {
      localStorage.removeItem("user"); // Clear user data if token expired
      setUser(null); // Reset UserContext state
    } else if (savedUser) {
      setUser(savedUser); // Set user data if token is still valid
    }
  }, [setUser]);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false); // Close Register Modal if open
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false); // Close Login Modal if open
    setIsRegisterModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    setUser(null); // Reset the user state
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              {user ? `Welcome Back, ${user.username}` : 'Welcome Back'}
            </h1>
            <p className="text-gray-400">Happy to see you again!</p>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={openRegisterModal}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                >
                  Register
                </button>
              </>
            )}
            <SearchButton />
          </div>
        </div>

        {/* Modals */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1"
              >
                &times;
              </button>
              <LoginPage closeModal={closeModal} switchToRegister={openRegisterModal} />
            </div>
          </div>
        )}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1"
              >
                &times;
              </button>
              <div>Register Page</div>
            </div>
          </div>
        )}

        {/* Portfolio Section */}
        <div className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4">Top Stocks</h2>
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {portfolioData.map((stock, index) => (
              <div
                key={index}
                onClick={() => setSelectedStock(stock)}
                className="cursor-pointer"
              >
                <PortfolioCard
                  company={stock.company}
                  ticker={stock.ticker}
                  logo={stock.logo}
                  value={stock.value}
                  change={stock.change}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Stock and Pie Chart */}
        <div className="flex justify-between space-x-6 mt-6">
          <div className="w-2/3">
            <StockCard stockData={selectedStock} />
          </div>
          <div className="w-1/3">
            <div className="bg-gray-800 p-4 rounded-lg">
              <SectorPieChart data={sectorData} />
            </div>
          </div>
        </div>

        {/* Wishlist, StockExchange, and Transactions */}
        <div className="flex mt-6 space-x-6">
          <div className="w-1/3">
            <Wishlist />
          </div>
          <div className="w-2/3 flex space-x-6">
            <div className="w-1/2">
              <StockExchange />
            </div>
            <div className="w-1/2">
              <Transaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
