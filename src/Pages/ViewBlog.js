import React from "react";
import { Link } from "react-router-dom";
import herro from "../Images/Herro.jpg";
import { FaCalendarAlt } from "react-icons/fa";

function ViewBlog() {
  return (
    <div className="mx-auto px-4 py-8 md:px-10 md:py-12 max-w-6xl">
      <h1 className="text-center font-extrabold text-4xl mb-8 text-gray-900">
        Read Our Latest Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-lg rounded-lg bg-white overflow-hidden">
          <img src={herro} alt="Blog" className="w-full h-72 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Uncover 5 Affordable Properties for Rent in Gombak
            </h2>
            <div className="flex items-center text-gray-600 mb-4">
              <FaCalendarAlt className="text-xl mr-2" />
              <p className="text-lg">July 17, 2024</p>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Looking for a property for rent in Gombak? You’re in the right spot! This vibrant area has become a popular choice for renters seeking affordable yet comfortable living. If you’re on a budget but don’t want to sacrifice comfort, Gombak might be the perfect spot for you. Let’s explore five fantastic rental options that offer great value without compromising on lifestyle.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3].map((item, index) => (
              <Link to="/ViewBlog" key={index}>
                <div className="shadow-md rounded-lg bg-white transition-transform transform hover:scale-105">
                  <img
                    src={herro}
                    alt="Blog Preview"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      7 Cost-Effective Renovation Ideas to Boost Your Rental Income
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <FaCalendarAlt className="text-xl mr-2" />
                      <p className="text-md">July 17, 2024</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/ViewAll">
          <button className="px-8 py-3 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewBlog;
