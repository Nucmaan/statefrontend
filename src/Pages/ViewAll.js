import React from "react";
import herro from "../Images/Herro.jpg";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";

function ViewAll() {
  return (
    <div className="mx-auto py-7 px-10">
      <h1 className="text-center font-bold text-3xl mb-8 text-gray-800">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item, index) => (
          <Link to="/ViewBlog" key={index}>
            <div className="shadow-lg rounded-md bg-white transition-transform transform hover:scale-105">
              <img src={herro} alt="Herro" className="w-full h-48 object-cover rounded-t-md" />
              <div className="p-4">
                <h1 className="mb-2 text-xl font-semibold text-gray-900">
                  7 Cost-Effective Renovation Ideas to Boost Your Rental Income
                </h1>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaCalendarAlt className="mr-1" />
                  <p className="mr-4">7/17/2024</p>
                  <FaTag className="mr-1" />
                  <p>Renovation</p>
                </div>
                <p className="text-gray-700 mb-4">
                  Discover cost-effective ways to enhance your rental property and increase your income.
                </p>
                <div className="flex items-center justify-between">
                  <Link to="/ViewBlog">
                    <button className="flex items-center px-4 py-2 font-bold border-2 border-black rounded-md hover:bg-gray-100 transition-colors duration-300">
                      <AiOutlineRead className="mr-2" />
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
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

export default ViewAll;
