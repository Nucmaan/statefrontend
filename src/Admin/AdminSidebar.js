import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaUsers, FaCog, FaTachometerAlt, FaChartLine, FaBuilding } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar

import { logoutStart, logoutSuccess, logoutFailure } from "../Redux/User/UserSlice";
import { useDispatch } from 'react-redux';

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); // Get enqueueSnackbar
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const response = await axios.get("/api/MyHome2U/user/logout");
      if (response.status === 200) {
        console.log("Logged Out");
        enqueueSnackbar("Logged Out Successfully", { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        dispatch(logoutSuccess());
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      dispatch(logoutFailure("Cannot log out now, check your settings"));
      console.log(error);
      enqueueSnackbar("Failed to log out. Please try again.", { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-black border-t-2 border-white text-white transition-all duration-300  ${isOpen ? 'w-48' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>Admin Panel</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl focus:outline-none">
          <BsThreeDotsVertical />
        </button>
      </div>
      <nav className="flex flex-col mt-4 space-y-2">
      <Link to="/admin/dashboard" className="flex items-center p-2 text-base hover:bg-gray-700">
      <FaTachometerAlt size={30} className="mr-3" />
      <span className={`${!isOpen && 'hidden'}`}>Dashboard</span>
    </Link>
        <Link to="/admin/profile" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaUser size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Profile</span>
        </Link>
        <Link to="/admin/listing" className="flex items-center p-2 text-base hover:bg-gray-700">
        <FaBuilding size={30} className="mr-3" />
        <span className={`${!isOpen && 'hidden'}`}>Property List</span>
      </Link>
        <Link to="/admin/users" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaUsers size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>User List</span>
        </Link>
        <Link to="/admin/setting" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaCog size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Settings</span>
        </Link>
        <Link to="/admin/report" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaChartLine size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Reports</span>
        </Link>
      
        <button className="flex items-center p-2 text-base hover:bg-gray-700" onClick={handleLogout}>
          <FaSignOutAlt size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`} >Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default AdminSidebar;
