import React from 'react';
import { FaHome, FaClipboardList, FaDollarSign, FaCalendarAlt, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import AgentSidebar from './AgentSidebar';

const AgentDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Agent Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Listings */}
            <div className="bg-blue-500 shadow-lg rounded-lg p-6 text-white">
              <FaHome className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Total Listings</h2>
              <p className="text-xl">24</p>
            </div>
            {/* Active Contracts */}
            <div className="bg-green-500 shadow-lg rounded-lg p-6 text-white">
              <FaClipboardList className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Active Contracts</h2>
              <p className="text-xl">12</p>
            </div>
            {/* Monthly Revenue */}
            <div className="bg-purple-500 shadow-lg rounded-lg p-6 text-white">
              <FaDollarSign className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Monthly Revenue</h2>
              <p className="text-xl">$12,345</p>
            </div>
            {/* Properties Under Review */}
            <div className="bg-yellow-500 shadow-lg rounded-lg p-6 text-white">
              <FaClipboardCheck className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Properties Under Review</h2>
              <p className="text-xl">5</p>
            </div>
            {/* Properties Sold */}
            <div className="bg-indigo-500 shadow-lg rounded-lg p-6 text-white">
              <FaCheckCircle className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Properties Sold</h2>
              <p className="text-xl">7</p>
            </div>
            {/* Upcoming Appointments */}
            <div className="bg-orange-500 shadow-lg rounded-lg p-6 text-white">
              <FaCalendarAlt className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Upcoming Appointments</h2>
              <p className="text-xl">3</p>
            </div>
          </div>

          {/* Recent Activities Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Property at 123 Main St was listed.</span>
                  <span className="text-sm text-gray-600">2 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Contract with Jane Doe was signed.</span>
                  <span className="text-sm text-gray-600">4 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Appointment with John Smith scheduled.</span>
                  <span className="text-sm text-gray-600">1 day ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Booking request for 456 Elm St was confirmed.</span>
                  <span className="text-sm text-gray-600">3 days ago</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600">
                Add New Listing
              </button>
              <button className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600">
                Create New Contract
              </button>
              <button className="bg-orange-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-orange-600">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
