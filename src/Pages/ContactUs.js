import React, { useCallback, useEffect, useState } from "react";
import { IoMdTime, IoMdCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useSnackbar } from "notistack";
import api from "../api";

function ContactUs() {
  const [social, setSocial] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const getSocialLinks = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/socialMedia/AllLinks");
      setSocial(response.data.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Server error";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getSocialLinks();
  }, [getSocialLinks]);

  return (
    <div className="bg-gray-50 py-14 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white shadow-md rounded-lg p-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Get in Touch</h1>
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <IoMdTime className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Opening Hours</h2>
                  <p className="text-lg text-gray-500">Monday - Friday: 9 AM - 5 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <IoMdCall className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Phone</h2>
                  <p className="text-lg text-gray-500">+6011 332 3658</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <MdOutlineMailOutline className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Email</h2>
                  <p className="text-lg text-gray-500">info@MyHome2U.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <CiLocationOn className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Address</h2>
                  <p className="text-lg text-gray-500">123 Main St, Mogadishu, Banadir, 252</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-5 mt-8">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-3xl text-blue-600 hover:text-blue-800 transition-colors duration-300" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-3xl text-pink-500 hover:text-pink-700 transition-colors duration-300" />
                </a>
              )}
              {social.tiktok && (
                <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="text-3xl text-black hover:text-gray-700 transition-colors duration-300" />
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="text-3xl text-red-600 hover:text-red-800 transition-colors duration-300" />
                </a>
              )}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border-2 border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border-2 border-gray-300 p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <textarea
                placeholder="Your Message"
                className="border-2 border-gray-300 p-4 w-full h-40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
