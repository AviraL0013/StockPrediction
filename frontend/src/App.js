import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Signup/Register';
import LoginPage from './components/Signup/LoginPage';
import Dashboard from './components/dashboard/dashboard';
import Portfolio from './components/PortfolioAnalysis';
import News from './components/news';
import Account from './components/Account';
import StockAnalysis from './components/stock-analysis/StockAnalysis';
import { SearchProvider } from './components/contexts/SearchContext';
import { TrendingStocksProvider } from './components/dashboard/topStocks';
import { UserProvider } from './components/contexts/UserContext';
import Logout from './components/Signup/logout';
const App = () => {
  return (
    <UserProvider>
      <SearchProvider>
        <TrendingStocksProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/news" element={<News />} />
              <Route path="/account" element={<Account />} />
              <Route path="/stock-analysis" element={<StockAnalysis />} />
            </Routes>
          </Router>
        </TrendingStocksProvider>
      </SearchProvider>
    </UserProvider>
  );
};

export default App;
