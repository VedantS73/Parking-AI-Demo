import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Car, Activity, Monitor, BarChart2, Clock } from 'lucide-react';
import Spaces from '../components/Spaces';
import Overview from '../components/Overview';
import Monitoring from '../components/Monitoring';
import Analytics from '../components/Analytics';

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