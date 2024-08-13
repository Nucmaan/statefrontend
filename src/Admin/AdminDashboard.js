import React from 'react';
import AdminSidebar from './AdminSidebar';
import { FaUsers, FaUserTie, FaHome, FaDollarSign, FaBed, FaKey } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users Card */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg p-6 flex items-center">
              <FaUsers className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-white text-2xl">1,234</p>
              </div>
            </div>
            
            {/* Total Agents Card */}
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg p-6 flex items-center">
              <FaUserTie className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Agents</h2>
                <p className="text-white text-2xl">567</p>
              </div>
            </div>
            
            {/* Total Properties Card */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg rounded-lg p-6 flex items-center">
              <FaHome className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Total Properties</h2>
                <p className="text-white text-2xl">890</p>
              </div>
            </div>
            
            {/* Available Properties Card */}
            <div className="bg-gradient-to-r from-teal-400 to-cyan-600 shadow-lg rounded-lg p-6 flex items-center">
              <FaKey className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Available Properties</h2>
                <p className="text-white text-2xl">123</p>
              </div>
            </div>
            
            {/* Houses Rented Card */}
            <div className="bg-gradient-to-r from-indigo-400 to-purple-600 shadow-lg rounded-lg p-6 flex items-center">
              <FaBed className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Houses Rented</h2>
                <p className="text-white text-2xl">456</p>
              </div>
            </div>
            
            {/* Monthly Revenue Card */}
            <div className="bg-gradient-to-r from-red-400 to-pink-500 shadow-lg rounded-lg p-6 flex items-center">
              <FaDollarSign className="text-white text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Monthly Revenue</h2>
                <p className="text-white text-2xl">$12,345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
