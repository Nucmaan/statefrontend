import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';

function ViewProperty() {
  const [Book, setBook] = useState(false);
  const [processing, setProcessing] = useState(false); // Add processing state
  const { id } = useParams(); // Destructure id from useParams
  const [visitingDate, setVisitingDate] = useState(null); // Corrected typo

  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar(); // Hook for Notistack

  const BookNow = () => {
    setBook(true);
  };

  const closebook = () => {
    setBook(false);
  };

  const [property, setProperty] = useState(null); // Initialize with null

  const getProperty = useCallback(async () => {
    try {
      const response = await axios.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  if (!property) {
    return <div>Loading...</div>; // Render loading state
  }

  const handleBooking = async () => {
    setProcessing(true); // Set processing to true when booking starts
    try {
      const response = await axios.post("/api/MyHome2U/Booking/AddNewBooking/", {
        property: property._id,
        user: user._id,
        visitingDate: visitingDate,
      });

      enqueueSnackbar('Booking confirmed successfully!', { variant: 'success' });
      console.log(response.data);
    } catch (error) {
      enqueueSnackbar('Failed to confirm booking. Please try again.', { variant: 'error' });
      console.error(error);
    } finally {
      setProcessing(false); // Set processing to false when booking ends
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto mb-6">
        <img
          src={property.image.url}
          alt="Property"
          className="w-full h-96 object-cover rounded-md shadow-lg"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex flex-wrap font-bold py-3 space-x-2 items-center">
              <p className="text-gray-600 mb-1">
                <span className="text-black"></span> {property.city}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="text-black">| </span> {property.title}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="text-black">|</span> {property.houseType}
              </p>
            </div>
            <button
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
              onClick={BookNow}
            >
              Book Now
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            ${property.price}/month
          </h1>

          <h2 className="text-lg font-bold text-gray-700 mb-2">Description</h2>
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

      {Book && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5">
          <div className="relative text-white bg-black p-6 rounded-md shadow-lg max-w-lg w-full">
            <button className="absolute top-2 right-2 text-2xl font-bold" onClick={closebook}>
              &times;
            </button>
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">House Location:</span>
                  <span>{property.address}, {property.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Price:</span>
                  <span>${property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Deposit:</span>
                  <span>${property.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Price:</span>
                  <span>${property.price + property.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status :</span>
                  <span>{property.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Visit Date:</span>
                  <input 
                    type="date"
                    id="visit-date"
                    value={visitingDate}
                    onChange={(e) => setVisitingDate(e.target.value)}
                    className="text-black p-1 border rounded-md"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">More Information :</span>
                  <span>Info@MyHome2U.com</span>
                </div>
              </div>
              <button
                type="submit"
                className={`px-6 py-2 mt-4 ${processing ? 'bg-gray-600' : 'bg-green-600'} text-white rounded-md w-full hover:${processing ? 'bg-gray-700' : 'bg-green-700'} transition-colors duration-300`}
                onClick={handleBooking}
                disabled={processing} // Disable button while processing
              >
                {processing ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProperty;
