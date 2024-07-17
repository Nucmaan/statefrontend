import { Link } from "react-router-dom";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";

import logo from "../Images/MyHomeLogo.png";


function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const handlenav = () => {
    setNavbar(!navbar);
  };

  return (
    <div className="  shadow-md mx-auto px-4 text-white bg-black ">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/"><img src={logo} alt="Logo" className="w-33 h-12" /></Link>
        </div>

        <div>
          <ul className="flex hidden md:flex">
            <li className="p-4 cursor-pointer uppercase"><Link to="/">Home</Link> </li>
            <li className="p-4 cursor-pointer  uppercase"><Link to="Property">Property</Link></li>
            <li className="p-4 cursor-pointer uppercase"><Link to="About">About Us</Link></li>
            <li className="p-4 cursor-pointer uppercase"><Link to="Contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <ul className="hidden flex items-center text-center  md:flex">
            <li className="p-4 cursor-pointer uppercase flex items-center"><MdLogin className="mr-2" size={21}/><Link to="login">Login</Link></li>
            <li className="p-4 cursor-pointer uppercase flex items-center"><Link to="register">Register</Link><RiLoginCircleFill className="ml-2 flex items-center" size={24}/></li>
          </ul>
        </div>

        <div className="md:hidden flex items-center pt-2" onClick={handlenav}>
          {!navbar ? (
            <AiOutlineClose size={30} />
          ) : (
            <GiHamburgerMenu size={30} />
          )}
        </div>
      </div>

      <ul className={!navbar ? 'bg-gray-50 text-black w-full absolute flex flex-col  justify-center items-center left-0 gap-y-2 pt-5  md:hidden' : 'hidden'}>
    
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer uppercase">
        <Link to="Property">Property</Link>
        </li>
        <li className="w-full flex justify-center border-b border-gray-600  p-4 cursor-pointer uppercase">
        <Link to="About">About Us</Link>
        </li>
        <li className="w-full flex justify-center border-b border-gray-600  p-4 cursor-pointer uppercase">
        <Link to="Contact">Contact Us</Link>
        </li>
        <div className="w-full flex flex-col ">
          <button className="mb-4 bg-blue-600 text-white p-2 font-bold uppercase">
          <Link to="login">Login</Link>
          </button>
          <button className="mb-4 bg-blue-600 text-white p-2 font-bold uppercase">
          <Link to="register">Register</Link>
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
