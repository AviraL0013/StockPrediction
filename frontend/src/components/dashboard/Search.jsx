// components/SearchButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

function SearchButton() {
  const { query, setQuery, setSymbol } = useSearch();
  const navigate = useNavigate();
 

  const getStockSymbol = async (query) => {
    const url = `https://yahoo-finance166.p.rapidapi.com/api/autocomplete?query=${query}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY // Replace with your actual API key
        }
      });
      const data = await response.json();
      console.log(process.env)
      if (data.quotes && data.quotes.length > 0) {
        setSymbol(data.quotes[0].symbol);
        navigate('/stock-analysis');
      } else {
        setSymbol("No matches found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSymbol("Error fetching data.");
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      getStockSymbol(query);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter company name"
          className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchButton;
