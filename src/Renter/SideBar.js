import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaSignOutAlt, FaTachometerAlt, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSnackbar } from 'notistack'; 
import { logoutStart, logoutSuccess, logoutFailure } from "../Redux/User/UserSlice";
import { useDispatch } from 'react-redux';
import api from "../api";


function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); 
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const response = await api.get("/api/MyHome2U/user/logout");
      if (response.status === 200) {
        enqueueSnackbar("Logged Out Successfully", { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        dispatch(logoutSuccess());
        navigate('/'); 
      }
    } catch (error) {
      dispatch(logoutFailure("Cannot log out now, check your settings"));
      enqueueSnackbar("Failed to log out. Please try again.", { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-black border-t-2 border-white text-white transition-all duration-300  ${isOpen ? 'w-48' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>User Panel</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl focus:outline-none">
          <BsThreeDotsVertical />
        </button>
      </div>
      <nav className="flex flex-col mt-4 space-y-2">
        <Link to="/user/Dashboard" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaTachometerAlt size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Dashboard</span>
        </Link>
        <Link to="/user/profile" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaUser size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Profile</span>
        </Link>
        <Link to="/user/Bookings" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaCalendarAlt size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Bookings</span>
        </Link>
        <Link to="/user/contract" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaCalendarAlt size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>My Contracts</span>
        </Link>
        <Link to="/user/Bills" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaMoneyBillWave size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Bills</span>
        </Link>
        <Link to="/user/Payments" className="flex items-center p-2 text-base hover:bg-gray-700">
          <FaCreditCard size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Payments</span>
        </Link>
        <button className="flex items-center p-2 text-base hover:bg-gray-700" onClick={handleLogout}>
          <FaSignOutAlt size={30} className="mr-3" />
          <span className={`${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default SideBar;
