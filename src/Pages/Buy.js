import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { PiToiletDuotone } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import api from "../api"; 

function Buy() {
  const [propertyList, setPropertyList] = useState(null);

  const getProperty = async () => {
    try {

      const response = await api.get("/api/MyHome2U/property/getallproperty");

      const buyAvailableProperties = response.data.properties.filter(
        property => property.houseType === "Buy" && property.status === "Available"
      );

      setPropertyList(buyAvailableProperties);

    } catch (error) {
       console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);

  if (propertyList === null) {
    return null; // Return nothing while loading
  }

  return (
    <div className="mx-auto px-4 pb-4 min-h-screen">
      {/* Search Bar */}
      <div className="flex border-2 border-black rounded-md overflow-hidden sticky top-[89px] z-40 bg-white shadow-md">
        <input
          type="text"
          placeholder="Type in Area / City Name"
          className="w-full p-2 border-r-2 border-black focus:outline-none"
        />
        <CiSearch className="p-2 text-black cursor-pointer" size={40} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
        {propertyList.map((property, index) => (
          <div
            key={index}
            className="shadow-md p-4 rounded-md hover:shadow-lg transition-shadow duration-300 bg-white relative"
          >
            {/* Status and House Type Labels */}
            <div className="absolute top-2 left-2 bg-indigo-600 text-white px-3 py-1 rounded-md">
              {property.status}
            </div>
            <img
              src={property.image.url}
              alt={property.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between items-center mb-4 relative">
              <h1 className="font-bold text-2xl">${property.price}</h1>
              <div className="absolute bottom-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-md">
                {property.houseType}
              </div>
            </div>
            <h2 className="font-bold mb-2">{property.city}</h2>
            <p className="mb-2 font-bold italic border-b-2 border-black pb-2">
              Deposit: ${property.deposit}
            </p>
            <div className="flex justify-between mb-4 text-gray-600">
              <div className="flex items-center">
                <FaBed className="text-black-600" />
                <span className="p-2">{property.bedrooms} bedroom</span>
              </div>
              <div className="flex items-center">
                <PiToiletDuotone className="text-black" />
                <span className="p-2">{property.bathrooms} bathroom</span>
              </div>
              <div className="flex items-center">
                <MdDirectionsCar className="text-black" />
                <span className="p-2">{property.parking} Parking</span>
              </div>
            </div>
            <div className="flex justify-center">
              <Link to={`/ViewSingleProperty/${property._id}`}>
                <button className="px-6 py-1 font-bold border-2 border-black rounded-md hover:bg-gray-100 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buy;
