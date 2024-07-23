import React from "react";
import logo from "../Images/MyHomeLogo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mx-auto bg-black  text-white  static left-0 bottom-0 w-full py-5 px-5 border-t-2 border-white">

      <div className="grid grid-cols-2 md:grid-cols-2 border-b-2 border-white  pb-2">

        <div className="">
          <img src={logo} alt="MyHome Logo" className="w-[240px]" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 ">
        
          <div className="flex flex-col ">
            <h1 className="  md:text-2xl font-bold uppercase mb-2">Links</h1>

            <Link to="/" className="text-white hover:text-gray-500 pl-2 mb-2">
              Home
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-500 pl-2 mb-2">
              Rent
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-500 pl-2 mb-2">
              Buy
            </Link>
            <Link to="/About" className="text-white hover:text-gray-500 pl-2 mb-2">
              About
            </Link>
            <Link to="/Contact" className="text-white hover:text-gray-500 pl-2 mb-2">
              Contact
            </Link>
          </div>

          <div className="flex flex-col ">
            <h1 className=" md:text-2xl font-bold uppercase mb-2">FollowUs</h1>

            <Link to="/" className="text-white hover:text-gray-500 pl-2 mb-2">
              Facebook
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-500 pl-2 mb-2">
              Instagram
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-500 pl-2 mb-2">
              TikTok
            </Link>
          
          </div>

          <div className="flex flex-col ml-5 md:ml-1 ">
            <h1 className=" md:text-2xl font-bold uppercase mb-2">Legal</h1>

            <Link to="/" className="text-white hover:text-gray-500 pl-2 mb-2">
              Privacy Policy
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-500 pl-2 mb-2">
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>

      <div className="flex  justify-between items-center text-white text-sm py-2">

        &copy; 2024 MyHome2U. All rights reserved.


        <div className="flex  justify-center items-center text-white text-sm py-2">
        <Link to="/" className="px-2">
          <FaFacebook size={30} />
        </Link>
        <Link to="/" className="px-2">
          <FaInstagram size={30} />
        </Link>
        <Link to="/" className="px-2">
          <IoLogoYoutube size={30} />
        </Link>
        <Link to="/" className="px-2">
          <AiFillTikTok size={30} />
        </Link>
      </div>

      </div>

    

    </div>
  );
}

export default Footer;
