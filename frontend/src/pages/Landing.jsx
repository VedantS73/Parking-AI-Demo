import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to Smart Parking System</h1>
        <p className="text-lg mt-4">AI-driven parking management to optimize your parking experience.</p>
        <div className="mt-8">
          <Link to="/user-dashboard" className="bg-yellow-400 text-black px-6 py-3 rounded-full mr-4 font-semibold hover:bg-yellow-500">
            User Dashboard
          </Link>
          <Link to="/admin-dashboard" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500">
            Admin Dashboard
          </Link>
        </div>
      </section>

      {/* User and Admin Flows */}
      <section className="py-16 px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-blue-600">User Flow</h2>
            <p className="mt-4 text-gray-600">
              Users can easily search for parking spots, view their parking history, and track loyalty points through a simplified and intuitive interface.
            </p>
          </div>
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-blue-600">Admin Flow</h2>
            <p className="mt-4 text-gray-600">
              Admins can manage parking locations, set prices, and view detailed statistics to optimize parking management.
            </p>
          </div>
        </div>
      </section>

      {/* Active Cities and Statistics */}
      <section className="bg-gray-200 py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Active Cities & Statistics</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 shadow-md rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-600">5 Cities</h3>
            <p className="mt-4 text-gray-600">Available in New York, San Francisco, Chicago, Austin, and Seattle.</p>
          </div>
          <div className="bg-white p-8 shadow-md rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-600">1000+ Users</h3>
            <p className="mt-4 text-gray-600">We&spos;ve served over a thousand users and counting!</p>
          </div>
          <div className="bg-white p-8 shadow-md rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-600">5000+ Parking Spots</h3>
            <p className="mt-4 text-gray-600">Ensuring ample space for all vehicle types.</p>
          </div>
        </div>
      </section>

      {/* Loyalty Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Loyalty Program</h2>
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-gray-600">
            Earn loyalty points each time you park. Accumulate enough points, and youll earn discounts or even free parking! 
            The more you use our system, the more you save. Get started today!
          </p>
          <div className="mt-6">
            <Link to="#" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
              View Loyalty Program
            </Link>
          </div>
        </div>
      </section>

      {/* Contact and Pricing Section */}
      <section className="bg-gray-200 py-16 px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-blue-600">Contact Us</h2>
            <p className="mt-4 text-gray-600">For support or inquiries, reach out to us at support@smartparking.com or call 123-456-7890.</p>
          </div>
          <div className="bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-blue-600">Pricing</h2>
            <p className="mt-4 text-gray-600">We offer competitive rates starting at just $5 per hour. Contact us for custom pricing plans for businesses and long-term parking.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;