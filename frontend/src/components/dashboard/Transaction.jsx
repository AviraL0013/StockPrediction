// Transaction.js
import React from 'react';

const transactions = [
  { action: 'Buy Meta', date: '7 DEC 2023', value: '+8.5%', type: 'buy' },
  { action: 'Sell Airbnb', date: '7 DEC 2023', value: '+8.5%', type: 'sell' },
  { action: 'Buy Goto', date: '7 DEC 2023', value: '+8.5%', type: 'buy' },
];

const Transaction = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full md:w-1/2">
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className={`flex justify-between items-center mb-4 ${transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}
        >
          <p>{transaction.action}</p>
          <div className="text-right">
            <p>{transaction.date}</p>
            <p>{transaction.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transaction;
