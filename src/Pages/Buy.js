import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { PiToiletDuotone } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import api from "../api"; 
import { useSnackbar } from "notistack";

function Buy() {
  const [propertyList, setPropertyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const getProperty = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/property/getallproperty");

      const buyAvailableProperties = response.data.properties.filter(
        property => property.houseType === "Buy" && property.status === "Available"
      );
      setPropertyList(buyAvailableProperties);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Server error";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProperties = propertyList.filter((property) =>
    property.city.toLowerCase().includes(searchQuery) ||
    property.address.toLowerCase().includes(searchQuery)
  );

  if (propertyList.length === 0) {
    return <div className="text-center mt-8 text-gray-600">No BuY properties available.</div>;
  }

  return (
    <div className="mx-auto px-4 pb-4 min-h-screen">

      <div className="flex border-2 border-black rounded-md overflow-hidden sticky top-[89px] z-40 bg-white shadow-md">
        <input
          type="text"
          placeholder="Type in Area / City Name"
          className="w-full p-2 border-r-2 border-black focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <CiSearch className="p-2 text-black cursor-pointer" size={40} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
        {filteredProperties.length === 0 ? (
          <div className="text-center col-span-3 text-gray-600">
            No properties match your search criteria.
          </div>
        ) : (
          filteredProperties.map((property, index) => (
            <div
              key={index}
              className="shadow-lg p-4 rounded-md hover:shadow-xl transition-shadow duration-300 bg-white relative"
            >
              <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-md text-xs">
                {property.status}
              </div>
              <img
                src={property.image.url}
                alt={property.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center mb-4 relative">
                <h1 className="font-bold text-2xl text-gray-800">${property.price}</h1>
                <div className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-md text-xs">
                  {property.houseType}
                </div>
              </div>
              <h2 className="font-bold mb-2 text-lg text-gray-700">{property.city}</h2>
              <p className="mb-2 font-bold italic border-b-2 border-gray-400 pb-2">
                Deposit: ${property.deposit}
              </p>
              <div className="flex justify-between mb-4 text-gray-600">
                <div className="flex items-center">
                  <FaBed className="text-indigo-600" />
                  <span className="p-2">{property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <PiToiletDuotone className="text-indigo-600" />
                  <span className="p-2">{property.bathrooms} bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center">
                  <MdDirectionsCar className="text-indigo-600" />
                  <span className="p-2">{property.parking} Parking{property.parking > 1 ? 's' : ''}</span>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Buy;
