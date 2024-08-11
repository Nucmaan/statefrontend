import React, { useEffect, useState } from "react";
import { FaRegNewspaper, FaCalendarAlt, FaUserCheck, FaClock } from "react-icons/fa";
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
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 bg-gray-100 p-4">
          <h1 className="text-2xl font-semibold mb-6">User Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Status Card */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <FaUserCheck className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">User Status: Active</h2>
                <p className="text-gray-600">Date: {formatDate(currentTime)}</p>
              </div>
            </div>
            
            {/* Current Time Card */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
              <FaClock className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Current Time</h2>
                <p className="text-gray-600">{formatTime(currentTime)}</p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">News & Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex justify-between items-center p-3 border-b border-gray-300"
                >
                  <div className="flex items-center">
                    <FaRegNewspaper className="text-gray-500 mr-3" />
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
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
