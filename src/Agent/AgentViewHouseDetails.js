import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AgentSidebar from './AgentSidebar';
import { FaMapMarkerAlt, FaBed, FaBath, FaCar, FaDollarSign } from 'react-icons/fa';
import api from "../api";



function AgentViewHouseDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const getProperty = useCallback(async () => {
    
    try {
     
      const response = await api.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
      
      setProperty(response.data.property);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>; // Render loading state
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Full Information About The House
            </h1>
            <div className="h-1 w-16 bg-blue-500 rounded-full mb-4"></div>
            <p className="text-lg text-gray-600">
              Explore the detailed information about this property including its features and pricing.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={property.image.url}
              alt="Property"
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between mb-6">
                <div className="flex flex-wrap items-center mb-4">
                  <p className="text-gray-600 mr-4 flex items-center">
                    <FaMapMarkerAlt className="text-lg mr-2 text-blue-500" />
                    <span className="font-semibold text-gray-800">{property.city}</span>
                  </p>
                  <p className="text-gray-600 mr-4 flex items-center">
                    <span className="font-semibold text-gray-800">|</span>
                    <span className="ml-2">{property.title}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold text-gray-800">|</span>
                    <span className="ml-2">{property.houseType}</span>
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ${property.price}/month
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 mb-4">{property.description}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Details</h3>
                <p className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-lg text-blue-500 mr-2" />
                  <span>Address: {property.address}, {property.city}</span>
                </p>
                <p className="flex items-center mb-2">
                  <FaBed className="text-lg text-yellow-500 mr-2" />
                  <span>Bedrooms: {property.bedrooms}</span>
                </p>
                <p className="flex items-center mb-2">
                  <FaBath className="text-lg text-blue-500 mr-2" />
                  <span>Bathrooms: {property.bathrooms}</span>
                </p>
                <p className="flex items-center">
                  <FaCar className="text-lg text-gray-600 mr-2" />
                  <span>Parking: {property.parking}</span>
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Booking Details</h3>
              <p className="flex items-center mb-2">
                <FaDollarSign className="text-lg text-green-500 mr-2" />
                <span>First Month Rental: ${property.price}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaDollarSign className="text-lg text-green-500 mr-2" />
                <span>Deposit: ${property.deposit}</span>
              </p>
              <p className="flex items-center font-bold">
                <FaDollarSign className="text-lg text-green-500 mr-2" />
                <span>Total: ${property.price + property.deposit}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentViewHouseDetails;
