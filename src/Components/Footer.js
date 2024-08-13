import React, { useCallback, useEffect, useState } from "react";
import logo from "../Images/MyHomeLogo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../api";

function Footer() {
  const [social, setSocial] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const getSocialLinks = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/socialMedia/AllLinks");
      setSocial(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to get social media links";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getSocialLinks();
  }, [getSocialLinks]);

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
            <a
              href={social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-4 hover:text-gray-500 mb-1"
            >
              Facebook
            </a>
            <a
              href={social.tiktok || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-4 hover:text-gray-500"
            >
              TikTok
            </a>
            <a
            href={social.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="pl-4 hover:text-gray-500 mb-1"
          >
            Instagram
          </a>
          <a
          href={social.youtube || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="pl-4 hover:text-gray-500 mb-1"
        >
          Youtube
        </a>
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
          <a
            href={social.facebook || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href={social.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href={social.youtube || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500"
          >
            <IoLogoYoutube size={30} />
          </a>
          <a
            href={social.tiktok || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500"
          >
            <AiFillTikTok size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
