import { Link } from "react-router-dom";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const handlenav = () => {
    setNavbar(!navbar);
  };

  return (
    <div className="  shadow-md mx-auto px-4 text-black">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="w-full text-3xl font-bold "><Link to="/">Nucmaan</Link></h1>
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
            <li className="p-4 cursor-pointer uppercase"><Link to="login">Login</Link></li>
            <li className="p-4 cursor-pointer uppercase"><Link to="register">Register</Link></li>
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

      <ul className={!navbar ? 'w-full absolute flex flex-col  justify-center items-center left-0 gap-y-2 pt-5  md:hidden' : 'hidden'}>
    
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
