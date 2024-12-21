// components/SectorPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';

const SectorPieChart = ({ data }) => {
  const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'];

  return (
    <div className="bg-gray-800 p-6 rounded-lg ">
      <div className="rounded-lg p-4">
        
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="sector"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              label
              isAnimationActive={true} // Enable animation
              animationBegin={0}
              animationDuration={1500} // Extended animation duration
              animationEasing="ease-out" // Smooth easing
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
             
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none' }} 
              itemStyle={{ color: '#fff' }} 
              cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} // Custom cursor
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" /> // Added legend
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorPieChart;
