import { Link } from 'react-router-dom';
import Logo from '../../assets/ParkAiLogo.png';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={Logo} alt="Smart Parking" className="h-14 rounded-lg" />
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/user-dashboard" className="hover:text-yellow-400">User Dashboard</Link></li>
          <li><Link to="/admin-dashboard" className="hover:text-yellow-400">Admin Dashboard</Link></li>
          {/* <li><Link to="/pricing" className="hover:text-yellow-400">Pricing</Link></li> */}
          {/* <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;