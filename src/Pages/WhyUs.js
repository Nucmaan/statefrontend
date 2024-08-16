import React from "react";
import { SiStreamrunners } from "react-icons/si";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { HiDocumentSearch } from "react-icons/hi";

function WhyUs() {
  return (
    <div className="px-10 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-3xl font-bold mb-10 text-black">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-600 p-4 rounded-full mb-4">
              <SiStreamrunners className="text-white" size={60} />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Speed</h3>
            <p className="text-center text-gray-700 leading-6">
              Rent your property 5x faster than traditional rental platforms, hassle-free!
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-600 p-4 rounded-full mb-4">
              <HiDocumentSearch className="text-white" size={60} />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Transparent</h3>
            <p className="text-center text-gray-700 leading-6">
              Enjoy zero hidden charges and surprises. Tenants and landlords deal directly.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="bg-indigo-600 p-4 rounded-full mb-4">
              <AiFillSafetyCertificate className="text-white" size={60} />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Safe</h3>
            <p className="text-center text-gray-700 leading-6">
              Get peace of mind with Allianz protection and a lawyer-approved digital tenancy agreement signing service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
