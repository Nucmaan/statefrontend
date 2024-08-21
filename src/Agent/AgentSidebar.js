import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCalendarAlt,
  FaFileContract,
  FaFileInvoiceDollar,
  FaReceipt,
} from "react-icons/fa";
import { MdPostAdd, MdManageHistory } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../Redux/User/UserSlice";

function AgentSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const response = await axios.get("/api/MyHome2U/user/logout");
      if (response.status === 200) {
        console.log("Logged Out");
        enqueueSnackbar("Logged Out Successfully", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        dispatch(logoutSuccess());
        navigate("/");
      }
    } catch (error) {
      dispatch(logoutFailure("Cannot log out now, check your settings"));
      enqueueSnackbar("Failed to log out. Please try again.", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-black border-t-2 border-white text-white transition-all duration-300 ${
        isOpen ? "w-40 md:w-48" : "w-14 md:w-16"
      }`}
    >
      <div className="flex items-center justify-between p-2 md:p-4">
        <span className={`text-lg md:text-xl font-semibold ${!isOpen && "hidden"}`}>
          Agent Panel
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg md:text-xl focus:outline-none"
        >
          <BsThreeDotsVertical />
        </button>
      </div>
      <nav className="flex flex-col mt-2 md:mt-4 space-y-1 md:space-y-2">
        <Link
          to="/agent/Dashboard"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaTachometerAlt size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Dashboard</span>
        </Link>
        <Link
          to="/agent/profile"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaUser size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Profile</span>
        </Link>
        <Link
          to="/agent/property-list"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaBuilding size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Property List</span>
        </Link>
        <Link
          to="/agent/Bookings"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaCalendarAlt size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Bookings</span>
        </Link>
        <Link
          to="/agent/contract"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaFileContract size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Contracts</span>
        </Link>
        <Link
          to="/agent/Bills-List"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaReceipt size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Add Bills</span>
        </Link>
        <Link
          to="/agent/Payments"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <MdManageHistory size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Manage Payments</span>
        </Link>
        <Link
          to="/agent/Bills"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <FaFileInvoiceDollar size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Bills</span>
        </Link>
        <Link
          to="/agent/Blog"
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
        >
          <MdPostAdd size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Blogs</span>
        </Link>
        <button
          className="flex items-center p-1 md:p-2 text-sm md:text-base hover:bg-gray-700"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={20} className="mr-2 md:mr-3" />
          <span className={`${!isOpen && "hidden"}`}>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default AgentSidebar;
