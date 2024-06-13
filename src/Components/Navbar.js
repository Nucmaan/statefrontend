import React from "react";

function Navbar() {
  return (
    <div className="shadow-md mx-auto px-4">
      <div className="flex justify-between items-center h-14 ">

        <h1 className="font-bold ">Nucmaan 2024</h1>

        <ul className="flex ">
          <li className="px-2 cursor-pointer ">HOME</li>
          <li className="px-2 cursor-pointer">PROPERTY</li>
          <li className="px-2 cursor-pointer">ABOUT US</li>
          <li className="px-2 cursor-pointer" >CONTACT US</li>
        </ul>

        <ul className="flex items-center text-center">
          <li className="cursor-pointer bg-blue-700 text-white px-4  py-2 rounded-sm">Login</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
