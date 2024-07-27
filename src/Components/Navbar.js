import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../Images/MyHomeLogo.png";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  const handleNav = () => {
    setNavbar(!navbar);
  };

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

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
          {isLogin ? (
            <div className="relative">
              <div className="p-4 cursor-pointer uppercase flex items-center hover:text-gray-400" onClick={handleDropdown}>
                <FaUserCircle size={30} />
              </div>
              {dropdown && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden z-20">
                  <li className="p-2 hover:bg-gray-200">
                    <Link to="/Dashboard">Dashboard</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-200">
                    <Link to="/Profile">Profile</Link>
                  </li>
                  <li className="p-2 hover:bg-gray-200">
                    <Link to="/" onClick={() => setIsLogin(false)}>Logout</Link>
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
        {!isLogin && (
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
