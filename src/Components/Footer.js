import React from "react";
import logo from "../Images/MyHomeLogo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-5 border-t-2 border-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-white pb-4">
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="MyHome Logo" className="w-[240px] mb-4" />
          <p className="text-center md:text-left">Find your dream home with us</p>
        </div>
        <div className="flex justify-center md:justify-around">
          <div className="flex flex-col text-left md:text-left mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl font-bold uppercase mb-2">Links</h2>
            <Link to="/" className="hover:text-gray-500 mb-1">Home</Link>
            <Link to="/rent" className="hover:text-gray-500 mb-1">Rent</Link>
            <Link to="/buy" className="hover:text-gray-500 mb-1">Buy</Link>
            <Link to="/about" className="hover:text-gray-500 mb-1">About</Link>
            <Link to="/contact" className="hover:text-gray-500">Contact</Link>
          </div>
          <div className="flex flex-col text-left md:text-left mb-4 md:mb-0">
            <h2 className="text-lg pl-4 md:text-xl font-bold uppercase mb-2">Follow Us</h2>
            <Link to="/" className="hover:text-gray-500 mb-1 pl-4">Facebook</Link>
            <Link to="/instagram" className="pl-4 hover:text-gray-500 mb-1">Instagram</Link>
            <Link to="/tiktok" className="pl-4 hover:text-gray-500">TikTok</Link>
          </div>
          <div className="flex flex-col text-left md:text-left">
            <h2 className="text-lg pl-4 md:text-xl font-bold uppercase mb-2">Legal</h2>
            <Link to="/privacy" className="pl-4 hover:text-gray-500 mb-1">Privacy Policy</Link>
            <Link to="/terms" className="pl-4 hover:text-gray-500">Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4">
        <p className="text-sm">&copy; 2024 MyHome2U. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-gray-500">
            <FaFacebook size={30} />
          </Link>
          <Link to="/" className="hover:text-gray-500">
            <FaInstagram size={30} />
          </Link>
          <Link to="/" className="hover:text-gray-500">
            <IoLogoYoutube size={30} />
          </Link>
          <Link to="/" className="hover:text-gray-500">
            <AiFillTikTok size={30} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
