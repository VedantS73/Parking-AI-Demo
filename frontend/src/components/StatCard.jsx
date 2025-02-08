import React from 'react';

const StatCard = ({ title, value, icon: Icon, bgColor, textColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${bgColor}`}>
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

export default StatCard;