import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingDashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <ParkingDashboard />
    </Router>
  )
}

export default App;