import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Landlord Section */}
          <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-black mb-2">Landlord</h2>
            <p className="text-gray-700 mb-4 font-medium">
              Rent out with up to 20x Better Protection
            </p>
            <div className="flex items-center justify-between bg-black text-white p-4 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors duration-300">
              <span className="text-lg font-semibold">POST PROPERTY FREE+</span>
              <HiArrowRight size={30} />
            </div>
          </div>

          {/* Tenant Section */}
          <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-black mb-2">Tenant</h2>
            <p className="text-gray-700 mb-4 font-medium">
              Rent a Home with Zero Deposit
            </p>
            <div className="flex items-center justify-between bg-black text-white p-4 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors duration-300">
              <span className="text-lg font-semibold">
              <Link to="/Rent">
              Search Property Now
              </Link>
              </span>
              <HiArrowRight size={30} />
            </div>
          </div>

          {/* New Launches Section */}
          <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-black mb-2">New Launches</h2>
            <p className="text-gray-700 mb-4 font-medium">
              Explore Upcoming Projects
            </p>
            <div className="flex items-center justify-between bg-black text-white p-4 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors duration-300">
              <span className="text-lg font-semibold">
              <Link to="/Buy">
              Buy New Property Now
              </Link>
              </span>
              <HiArrowRight size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
