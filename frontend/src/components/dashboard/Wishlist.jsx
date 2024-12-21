import React, { useState } from 'react';

const Wishlist = () => {
  // Initialize the wishlist items state
  const [wishlistItems, setWishlistItems] = useState([
    { item: 'Tesla Inc', price: '$300.00', logo: 'https://logo.clearbit.com/tesla.com' },
    { item: 'Microsoft Corp', price: '$250.50', logo: 'https://logo.clearbit.com/microsoft.com' },
    { item: 'Netflix Inc', price: '$420.75', logo: 'https://logo.clearbit.com/netflix.com' },
  ]);

  // Function to add a new item to the wishlist
  const addItemToWishlist = () => {
    // Add a new item (you can replace this with user input or API integration)
    const newItem = { item: 'New Company', price: '$100.00', logo: 'https://logo.clearbit.com/example.com' };
    setWishlistItems((prevItems) => [...prevItems, newItem]);
  };
  // const addToPortfolio

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      {/* Wishlist header with title and "+" button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Wishlist</h2>
       
      </div>

      {/* Wishlist items */}
      <div className="space-y-4">
        {wishlistItems.map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <img src={item.logo} alt={`${item.item} logo`} className="w-10 h-10 mr-4" />
              <span className="text-lg font-semibold text-white">{item.item}</span>
            </div>
            <span className="text-lg text-gray-400">{item.price}</span>
            <button
         
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          +
        </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
