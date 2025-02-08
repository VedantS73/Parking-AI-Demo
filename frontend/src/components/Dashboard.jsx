import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Car, Activity, Monitor, BarChart2, Clock } from 'lucide-react';

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

const Overview = ({ spaces, spaceStatus }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Spaces" 
        value={spaces.length}
        icon={Car}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      <StatCard 
        title="Available Spaces" 
        value={spaceStatus.free_spaces}
        icon={Activity}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <StatCard 
        title="Occupied Spaces" 
        value={spaceStatus.occupied_spaces}
        icon={Car}
        bgColor="bg-red-100"
        textColor="text-red-600"
      />
      <StatCard 
        title="Occupancy Rate" 
        value={`${Math.round((spaceStatus.occupied_spaces / spaces.length) * 100)}%`}
        icon={Activity}
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {spaces.map((space) => (
        <div
          key={space.id}
          className={`p-4 rounded-lg border ${
            space.is_occupied 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Space {space.space_number}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              space.is_occupied 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {space.is_occupied ? 'Occupied' : 'Available'}
            </span>
          </div>
          {space.current_vehicle && (
            <p className="text-sm text-gray-600">Vehicle: {space.current_vehicle}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

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

const Spaces = ({ spaces }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Space Number
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Vehicle
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Updated
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {spaces.map((space) => (
          <tr key={space.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Space {space.space_number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 text-xs rounded-full ${
                space.is_occupied 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {space.is_occupied ? 'Occupied' : 'Available'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {space.current_vehicle || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date().toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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

const ParkingDashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [spaceStatus, setSpaceStatus] = useState({
    free_spaces: 0,
    occupied_spaces: 0,
    space_details: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spacesRes, statusRes] = await Promise.all([
          fetch('http://localhost:5000/api/spaces'),
          fetch('http://localhost:5000/api/space_status')
        ]);
        const [spacesData, statusData] = await Promise.all([
          spacesRes.json(),
          statusRes.json()
        ]);
        setSpaces(spacesData);
        setSpaceStatus(statusData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: '/', icon: Car, label: 'Overview' },
    { path: '/monitoring', icon: Monitor, label: 'Monitoring' },
    { path: '/spaces', icon: Activity, label: 'Spaces' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <nav className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-8">Parking Management</h1>
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Overview spaces={spaces} spaceStatus={spaceStatus} />} />
          <Route path="/monitoring" element={<Monitoring spaceStatus={spaceStatus} />} />
          <Route path="/spaces" element={<Spaces spaces={spaces} />} />
          <Route path="/analytics" element={<Analytics spaces={spaces} spaceStatus={spaceStatus} />} />
        </Routes>
      </main>
    </div>
  );
};

export default ParkingDashboard;