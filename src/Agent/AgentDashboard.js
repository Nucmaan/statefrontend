import React from 'react';
import AgentSidebar from './AgentSidebar';

const AgentDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <AgentSidebar />
        <div className="flex-1 bg-gray-300 p-6">
          <h1 className="text-2xl font-semibold mb-6">User Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Total Users</h2>
              <p className="text-gray-600">1,234</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Total Agents</h2>
              <p className="text-gray-600">567</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
              <p className="text-gray-600">$45,678</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Pending Requests</h2>
              <p className="text-gray-600">89</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">New Messages</h2>
              <p className="text-gray-600">12</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
              <p className="text-gray-600">$12,345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
