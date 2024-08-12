import React, { useEffect, useState } from "react";
import { FaRegNewspaper, FaCalendarAlt, FaUserCheck, FaClock, FaHome, FaFileInvoiceDollar, FaBookmark } from "react-icons/fa";
import SideBar from "./SideBar";

const UserDashboard = () => {
  const announcements = [
    { id: 1, title: "New Policy Update", date: "2024-08-01" },
    { id: 2, title: "Maintenance Notice", date: "2024-08-05" },
    { id: 3, title: "Community Event", date: "2024-08-10" },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Status Card */}
            <div className="bg-green-100 shadow-md rounded-lg p-4 flex items-center">
              <FaUserCheck className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">User Status: Active</h2>
                <p className="text-gray-600">Date: {formatDate(currentTime)}</p>
              </div>
            </div>
            
            {/* Current Time Card */}
            <div className="bg-blue-100 shadow-md rounded-lg p-4 flex items-center">
              <FaClock className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Current Time</h2>
                <p className="text-gray-600">{formatTime(currentTime)}</p>
              </div>
            </div>

            {/* Bookings Card */}
            <div className="bg-yellow-100 shadow-md rounded-lg p-4 flex items-center">
              <FaBookmark className="text-yellow-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Your Bookings</h2>
                <p className="text-gray-600">Upcoming visits: 3</p>
              </div>
            </div>

            {/* Property Details Card */}
            <div className="bg-purple-100 shadow-md rounded-lg p-4 flex items-center">
              <FaHome className="text-purple-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Your Properties</h2>
                <p className="text-gray-600">Currently renting: 1</p>
              </div>
            </div>

            {/* Payment Due Card */}
            <div className="bg-red-100 shadow-md rounded-lg p-4 flex items-center">
              <FaFileInvoiceDollar className="text-red-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Payment Due</h2>
                <p className="text-gray-600">Next payment: $1,200 on 2024-09-01</p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">News & Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex justify-between items-center p-3 border-b border-gray-300"
                >
                  <div className="flex items-center">
                    <FaRegNewspaper className="text-gray-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    <span>{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
