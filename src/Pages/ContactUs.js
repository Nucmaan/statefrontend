import React from "react";
import { IoMdTime } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

function ContactUs() {
  return (
    <div className="mx-auto py-5 bg-gray-100">
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="mb-8 md:mb-0">
          <h1 className="mb-2 font-bold text-2xl text-black">Welcome to MyHome2U, Please Contact Us</h1>
          <div className="pl-5">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <IoMdTime className="text-black mr-2" /> Opening Hours
            </h2>
            <p className="text-xl mb-4">Monday - Friday: 9 AM - 5 PM</p>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <IoMdCall className="text-black mr-2" /> Phone
            </h2>
            <p className="text-xl mb-4">+601113323658</p>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <MdOutlineMailOutline className="text-black mr-2" /> Email
            </h2>
            <p className="text-xl mb-4">info@MyHome2U.com</p>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <CiLocationOn className="text-black mr-2" /> Address
            </h2>
            <p className="text-xl mb-4">123 Main St, Mogadishu, Banadir, 252</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            placeholder="Your Message"
            className="border-2 border-gray-300 p-3 w-full h-32 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="bg-black text-white px-5 py-3 rounded-md hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
