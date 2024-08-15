import React from "react";
import { IoMdTime } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
          <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h1>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <IoMdTime className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Opening Hours</h2>
                  <p className="text-lg text-gray-600">Monday - Friday: 9 AM - 5 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <IoMdCall className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Phone</h2>
                  <p className="text-lg text-gray-600">+6011 332 3658</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MdOutlineMailOutline className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Email</h2>
                  <p className="text-lg text-gray-600">info@MyHome2U.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CiLocationOn className="text-4xl text-gray-900" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Address</h2>
                  <p className="text-lg text-gray-600">123 Main St, Mogadishu, Banadir, 252</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-2xl text-blue-600 hover:text-blue-700 transition-colors duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-blue-400 hover:text-blue-500 transition-colors duration-300" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-2xl text-blue-700 hover:text-blue-800 transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <textarea
                placeholder="Your Message"
                className="border-2 border-gray-300 p-3 w-full h-32 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
              />
              <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300">
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
