// src/Admin/Report.js
import React from 'react';
import AdminSidebar from './AdminSidebar';

const Report = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6">Report</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Here you can view and generate reports.</p>
            {/* Add your report options or content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
