import SideBar from './SideBar';
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useSnackbar } from 'notistack';

function HouseInformation() {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();  
  const [property, setProperty] = useState(null); 

  const getProperty = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Server error";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  if (!property) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>; // Render loading state
  }

  return (
    <div className="min-h-screen bg-black flex">
        <SideBar />
      <div className="w-full bg-gray-100 p-8 sm:p-12">
        <h1 className=" text-3xl md:text-3xl font-semibold text-gray-800 mb-6">
          Full Information About The House
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <img
              src={property.image.url}
              alt="Property"
              className="w-full h-64 sm:h-96 object-cover rounded-md shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">{property.title}</h2>
              <p className="text-gray-600 text-lg">{property.city} | {property.houseType}</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-4">
                ${property.price}/month
              </h2>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 text-base mb-4">{property.description}</p>
            </div>
            <div className="p-4 border-2 border-gray-300 rounded-md bg-white shadow-md">
              <h3 className="font-bold text-lg mb-2">Booking Details</h3>
              <p className="mb-2">First Month Rental: ${property.price}</p>
              <p className="mb-2">Deposit: ${property.deposit}</p>
              <p className="font-bold">Total: ${property.price + property.deposit}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Details</h3>
          <p className="text-gray-600 text-base mb-2">Address: {property.address}, {property.city}</p>
          <p className="text-gray-600 text-base">Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms} | Parking: {property.parking}</p>
        </div>
      </div>
    </div>
  );
}

export default HouseInformation;
