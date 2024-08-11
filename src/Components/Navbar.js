import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../Images/MyHomeLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { SignOutStart, SignOutSuccess, SignOutFailure } from "../Redux/User/UserSlice";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNav = () => {
    setNavbar(!navbar);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      dispatch(SignOutStart());
      const response = await axios.get("/api/MyHome2U/user/logout");
      if (response.status === 200) {
        console.log("Logged Out");
        Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully',
          text: 'You have successfully logged out.',
        }).then(() => {
          dispatch(SignOutSuccess());
          navigate('/');
          setDropdown(false);
        });
      }
    } catch (error) {
      dispatch(SignOutFailure("Cannot log out now, check your settings"));
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'Failed to log out. Please try again.',
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="shadow-md mx-auto px-4 text-white bg-black sticky top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center py-2">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-33 h-12" />
          </Link>
        </div>

        <div>
          <ul className="hidden md:flex space-x-4">
            <li className="p-4 cursor-pointer uppercase hover:text-gray-400">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 cursor-pointer uppercase hover:text-gray-400">
              <Link to="Rent">Rent</Link>
            </li>
            <li className="p-4 cursor-pointer uppercase hover:text-gray-400">
              <Link to="Buy">Buy</Link>
            </li>
            <li className="p-4 cursor-pointer uppercase hover:text-gray-400">
              <Link to="About">About Us</Link>
            </li>
            <li className="p-4 cursor-pointer uppercase hover:text-gray-400">
              <Link to="Contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          {user ? (
            <div className="relative">
              <div
                className="p-4 cursor-pointer uppercase flex items-center hover:text-gray-400"
                onClick={handleDropdown}
              >
                <img
                  src={user.avatar.url} // Correctly using user's avatar from Redux state
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              {dropdown && (
                <ul
                  className="absolute right-0 mt-2 w-48 border-l-2 border-r-2 border-b-2 shadow-md border-black bg-white text-black overflow-hidden z-40"
                  ref={dropdownRef}
                >
                  <li className="p-2 hover:bg-gray-200">
                    <Link to={
                      user.role === 'user'
                        ? '/user/Dashboard'
                        : user.role === 'admin'
                        ? '/admin/dashboard'
                        : user.role === 'agent'
                        ? '/agent/Dashboard'
                        : '/login'
                    }
                    >Dashboard</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-200">
                    <Link to={
                      user.role === 'user'
                        ? '/user/profile'
                        : user.role === 'admin'
                        ? '/admin/profile'
                        : user.role === 'agent'
                        ? '/Agent/Profile'
                        : '/'
                    }>Profile</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <ul className="hidden md:flex space-x-4">
              <li className="p-4 cursor-pointer uppercase flex items-center hover:text-gray-400">
                <Link to="login">Login</Link>
              </li>
              <li className="p-4 cursor-pointer uppercase flex items-center hover:text-gray-400">
                <Link to="register">Register</Link>
              </li>
            </ul>
          )}
        </div>

        <div className="md:hidden flex items-center" onClick={handleNav}>
          {navbar ? (
            <AiOutlineClose size={30} className="text-white" />
          ) : (
            <GiHamburgerMenu size={30} className="text-white" />
          )}
        </div>
      </div>

      <ul
        className={
          navbar
            ? "bg-white text-black w-full absolute flex flex-col justify-center items-center left-0 gap-y-2 pt-5 md:hidden"
            : "hidden"
        }
      >
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer uppercase hover:bg-gray-200">
          <Link to="Rent">Rent</Link>
        </li>
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer uppercase hover:bg-gray-200">
          <Link to="Buy">Buy</Link>
        </li>
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer uppercase hover:bg-gray-200">
          <Link to="About">About Us</Link>
        </li>
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer uppercase hover:bg-gray-200">
          <Link to="Contact">Contact Us</Link>
        </li>
        {!user && (
          <div className="w-full flex flex-col items-center">
            <button className="mb-4 bg-blue-600 text-white p-2 font-bold uppercase w-3/4">
              <Link to="login">Login</Link>
            </button>
            <button className="mb-4 bg-blue-600 text-white p-2 font-bold uppercase w-3/4">
              <Link to="register">Register</Link>
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
