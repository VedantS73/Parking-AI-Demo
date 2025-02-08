import React from "react";

const Monitoring = ({ spaceStatus }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-white rounded-lg border p-4">
      <h2 className="text-lg font-semibold mb-4">Camera Feed</h2>
      <img
        src="http://localhost:5000/video_feed"
        alt="Live Parking Feed"
        className="w-full rounded-lg"
      />
    </div>
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Available</h3>
          <p className="text-3xl font-bold text-green-600">
            {spaceStatus.free_spaces}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">Occupied</h3>
          <p className="text-3xl font-bold text-red-600">
            {spaceStatus.occupied_spaces}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Monitoring;
