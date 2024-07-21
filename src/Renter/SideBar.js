import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";

import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="pt-2 flex flex-col  bg-black mt-6">
      <Link to="/WelcomeUser">
        <div className="flex flex-col justify-center items-center mb-2 mt-2">
          <MdDashboard size={30} className="text-white " />
          <p className="text-white font-bold mt-2 mb-2">Dashboard</p>
        </div>
      </Link>

      <Link to="/Profile">
        <div className="flex flex-col justify-center items-center mb-2 ">
          <FaRegUserCircle size={30} className="text-white " />
          <p className="text-white font-bold mt-2 mb-2">Profile</p>
        </div>
      </Link>

      <Link to="/Booking">
        <div className="flex flex-col justify-center items-center mb-2 ">
          <IoBookmarksOutline size={30} className="text-white " />
          <p className="text-white font-bold mt-2  mb-2">Booking</p>
        </div>
      </Link>

      <Link to="/Bills">
        <div className="flex flex-col justify-center items-center mb-2 ">
          <FaRegMoneyBill1 size={30} className="text-white " />
          <p className="text-white font-bold mt-2  mb-2">Bills</p>
        </div>
      </Link>

      <Link to="/">
        <div className="flex flex-col justify-center items-center mb-2 ">
          <CiLogin size={30} className="text-white " />
          <p className="text-white font-bold mt-2  mb-2">Logout</p>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
