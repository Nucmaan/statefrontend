import SideBar from './SideBar';
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useSnackbar } from 'notistack';

function HouseInformaton() {
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
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex  ">
        <SideBar />
        <div className="flex-1 bg-gray-100 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-black">
              Full Information About The House
            </h1>
          </div>
          <div className="container mx-auto">
            <div className="w-full max-w-full sm:max-w-4xl mx-auto mb-6">
              <img
                src={property.image.url}
                alt="Property"
                className="w-full h-64 sm:h-96 object-cover rounded-md shadow-lg"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="flex flex-wrap font-bold py-3 space-x-2 items-center">
                    <p className="text-gray-600 mb-1">
                      <span className="text-black"></span> {property.city}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="text-black">|</span> {property.title}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="text-black">|</span> {property.houseType}
                    </p>
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
                  ${property.price}/month
                </h1>
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <h2 className="text-lg font-bold text-gray-700 mb-2">Details</h2>
                <p className="text-gray-600 mb-4">
                  Address: {property.address}, {property.city}
                </p>
                <p className="text-gray-600 mb-4">
                  Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms} | Parking: {property.parking}
                </p>
              </div>
              <div className="p-4 border-2 border-black rounded-md bg-white shadow-lg">
                <h3 className="font-bold text-xl mb-2">Booking Details</h3>
                <p className="mb-2">First Month Rental: ${property.price}</p>
                <p className="mb-2">Deposit: ${property.deposit}</p>
                <p className="font-bold mb-2">Total: ${property.price + property.deposit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseInformaton;
