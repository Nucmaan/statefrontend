import React from "react";
import { Link } from "react-router-dom";
import herro from "../Images/Herro.jpg";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";

function Blog() {
  return (
    <div className="mx-auto py-10 px-5 md:px-10 bg-gray-50">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-900">
        Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item, index) => (
          <Link to="/ViewBlog" key={index}>
            <div className="shadow-lg rounded-lg bg-white overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={herro}
                alt="Blog Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h1 className="text-xl font-semibold text-gray-800 mb-3">
                  7 Cost-Effective Renovation Ideas to Boost Your Rental Income
                </h1>
                <div className="flex items-center mb-4 text-gray-600">
                  <FaCalendarAlt className="mr-2" />
                  <p className="mr-6">7/17/2024</p>
                  <FaTag className="mr-2" />
                  <p>Renovation</p>
                </div>
                <p className="text-gray-700 mb-4">
                  Discover cost-effective ways to enhance your rental property and increase your income.
                </p>
                <div className="flex items-center justify-between">
                  <Link to="/ViewBlog">
                    <button className="flex items-center px-4 py-2 font-semibold text-white bg-black border-2 border-black rounded-md hover:bg-gray-800 transition-colors duration-300">
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
          <button className="px-6 py-2 font-semibold bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
