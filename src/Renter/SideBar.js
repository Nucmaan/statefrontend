import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="pt-4 flex flex-col bg-black h-full border-t-2 border-white text-center">
      <Link to="/Dashboard">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <MdDashboard size={30} className="text-blue-400" />
          <p className="text-white font-bold mt-2">Dashboard</p>
        </div>
      </Link>

      <Link to="/Profile">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <FaRegUserCircle size={30} className="text-green-400" />
          <p className="text-white font-bold mt-2">Profile</p>
        </div>
      </Link>

      <Link to="/Booking">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <IoBookmarksOutline size={30} className="text-yellow-400" />
          <p className="text-white font-bold mt-2">Booking</p>
        </div>
      </Link>

      <Link to="/Bills">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <FaRegMoneyBill1 size={30} className="text-red-400" />
          <p className="text-white font-bold mt-2">Billing</p>
        </div>
      </Link>

      <Link to="/Payment">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <RiSecurePaymentFill size={30} className="text-purple-400" />
          <p className="text-white font-bold mt-2">Payment</p>
        </div>
      </Link>

      <Link to="/">
        <div className="flex flex-col justify-center items-center mb-4 hover:bg-gray-800 p-2 rounded-md transition duration-300">
          <CiLogin size={30} className="text-pink-400" />
          <p className="text-white font-bold mt-2">Logout</p>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
