import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Monitor, Activity, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', icon: Car, label: 'Overview' },
    { path: '/monitoring', icon: Monitor, label: 'Monitoring' },
    { path: '/spaces', icon: Activity, label: 'Spaces' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' }
  ];

  return (
    <nav className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-8">Parking Management</h1>
      <div className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
