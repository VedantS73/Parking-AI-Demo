import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import ParkingDashboard from './pages/Dashboard';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-dashboard/*" element={<ParkingDashboard />} />
      </Routes>
      <Footer />
    </Router>

    </div>
  )
}

export default App;