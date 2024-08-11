import React from "react";
import { Link } from "react-router-dom";
import herro from "../Images/Herro.jpg";
import { FaCalendarAlt } from "react-icons/fa";

function ViewBlog() {
  return (
    <div className="mx-auto px-4 py-6">
      <h1 className="text-center font-bold text-3xl mb-8 text-gray-800">Read Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="shadow-lg rounded-md bg-white overflow-hidden">
          <img src={herro} alt="Blog" className="w-full h-64 object-cover" />
          <div className="p-4">
            <h1 className="font-bold text-2xl mb-3 text-gray-900">
              Uncover 5 Affordable Properties for Rent in Gombak
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <FaCalendarAlt className="mr-2" />
              <p>7/17/2024</p>
            </div>
            <p className="leading-7 text-gray-700 text-justify">
              Looking for a property for rent in Gombak? You’re in the right spot! This vibrant area has become a popular choice for renters seeking affordable yet comfortable living. If you’re on a budget but don’t want to sacrifice comfort, Gombak might be the perfect spot for you. Let’s explore five fantastic rental options that offer great value without compromising on lifestyle.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-bold text-xl mb-4 text-gray-800">More Articles</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3].map((item, index) => (
              <Link to="/ViewBlog" key={index}>
                <div className="shadow-md rounded-md bg-white transition-transform transform hover:scale-105">
                  <img src={herro} alt="Blog Preview" className="w-full h-40 object-cover rounded-t-md" />
                  <div className="p-4">
                    <h1 className="font-semibold text-xl text-gray-900 mb-2">
                      7 Cost-Effective Renovation Ideas to Boost Your Rental Income
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <p>7/17/2024</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/ViewAll">
          <button className="px-6 py-2 font-bold bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewBlog;
