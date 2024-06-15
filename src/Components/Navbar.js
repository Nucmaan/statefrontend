import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  
  return (
    <div className="h-16  shadow-md mx-auto px-4 text-black">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="w-full text-3xl font-bold ">Nucmaan</h1>
        </div>

        <div>
          <ul className="flex hidden md:flex">
            <li className="p-4 cursor-pointer">Home</li>
            <li className="p-4 cursor-pointer">Property</li>
            <li className="p-4 cursor-pointer">About Us</li>
            <li className="p-4 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div>
          <ul className="hidden flex items-center text-center  md:flex">
            <li className="p-4 cursor-pointer">Login</li>
            <li className="p-4 cursor-pointer">Register</li>
          </ul>
        </div>

        <div className="md:hidden flex items-center pt-2">
          <AiOutlineClose size={30} />
        </div>
      </div>

      <ul className="w-full absolute flex flex-col  justify-center items-center left-0 gap-y-2 pt-5  md:hidden">
        <li className="w-full flex justify-center p-4 border-b border-gray-600 cursor-pointer">Home</li>
        <li className="w-full flex justify-center border-b border-gray-600 p-4 cursor-pointer">Property</li>
        <li className="w-full flex justify-center border-b border-gray-600  p-4 cursor-pointer">About Us</li>
        <li className="w-full flex justify-center border-b border-gray-600  p-4 cursor-pointer">Contact Us</li>
        <div className="w-full flex flex-col ">
          <button className="mb-4 bg-blue-600 text-white p-2 font-bold ">
            Login
          </button>
          <button className="mb-4 bg-blue-600 text-white p-2 font-bold">
            Register
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
