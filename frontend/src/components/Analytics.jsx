import React from "react";

const Analytics = ({ spaces, spaceStatus }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Occupancy Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Average Occupancy Rate</p>
          <p className="text-2xl font-bold text-blue-800">
            {Math.round((spaceStatus.occupied_spaces / spaces.length) * 100)}%
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600">Peak Hours</p>
          <p className="text-2xl font-bold text-purple-800">2PM - 4PM</p>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;
