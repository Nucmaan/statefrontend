import React from "react";
import { FaHome, FaBell, FaUser, FaCog, FaChartBar, FaEnvelope } from "react-icons/fa";
import SideBar from "./SideBar";

function UserDashboard() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr] min-h-screen text-white">

      <div className="bg-black">
        <SideBar />
      </div>

      <div className="py-10 bg-gray-100 text-black flex flex-col items-center  space-y-4">
        <div className="text-center">
          <FaHome className="text-5xl text-blue-500 mb-4 mx-auto animate-bounce" />
          <p className="text-3xl font-semibold mb-2">
            Welcome to your dashboard.
          </p>
          <p className="text-lg">
            Explore your personalized dashboard to manage your account and stay updated.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <FaBell className="text-4xl text-green-500 mb-2 mx-auto animate-pulse" />
            <p className="text-lg font-medium">Notifications</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <FaUser className="text-4xl text-purple-500 mb-2 mx-auto" />
            <p className="text-lg font-medium">Profile</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <FaCog className="text-4xl text-red-500 mb-2 mx-auto" />
            <p className="text-lg font-medium">Settings</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <FaChartBar className="text-4xl text-yellow-500 mb-2 mx-auto animate-spin" />
            <p className="text-lg font-medium">Analytics</p>
          </div>
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <FaEnvelope className="text-4xl text-blue-500 mb-2 mx-auto" />
            <p className="text-lg font-medium">Messages</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserDashboard;
