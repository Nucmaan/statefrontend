import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../api"; 
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaDollarSign, FaHome } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function ViewProperty() {
  const [Book, setBook] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { id } = useParams();
  const [visitingDate, setVisitingDate] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [property, setProperty] = useState(null);
  const [userBooking, setUserBooking] = useState(null);

  const getUserBooking = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Booking/GetUserBookings/${user._id}`);
      setUserBooking(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  const BookNow = () => {
    setBook(true);
  };

  const closebook = () => {
    setBook(false);
  };

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
    getUserBooking();
  }, [getProperty, getUserBooking]);

  if (!property) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const handleBooking = async () => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Please login to book property',
        text: 'You must be logged in to book a property.',
        showConfirmButton: true,
      });
      return;
    }

    if (user._id === property.owner) {
      Swal.fire({
        icon: 'error',
        title: 'Cannot book your own property',
        text: 'You cannot book your own property.',
        showConfirmButton: true,
      });
      return;
    }

    if (user.role === 'admin' || user.role === 'agent') {
      Swal.fire({
        icon: 'error',
        title: 'Cannot book property as an admin or agent',
        text: 'You are not authorized to book a property use user account.',
        showConfirmButton: true,
      });
      return;
    }

    // Check if the user has already booked this property
    const hasAlreadyBooked = userBooking.some(
      booking => booking.property._id === property._id
    );

    if (hasAlreadyBooked) {
      Swal.fire({
        icon: 'error',
        title: 'Already booked',
        text: 'You have already booked this property.',
        showConfirmButton: true,
      });
      return;
    }

    setProcessing(true);

    try {
      const response = await api.post("/api/MyHome2U/Booking/AddNewBooking/", {
        property: property._id,
        user: user._id,
        visitingDate: visitingDate,
      });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Booking confirmed successfully!',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to confirm booking',
          text: 'Please try again.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Property Details */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <img
          src={property.image.url}
          alt="Property"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex flex-wrap items-center space-x-4 mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
            </div>
            <button
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-indigo-400 transition-colors duration-300"
              onClick={BookNow}
            >
              Book Now
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            <FaDollarSign className="inline mr-2 text-indigo-600" /> ${property.price}/month
          </h2>

          <div className="flex flex-wrap items-center mb-6 space-x-4">
            <p className="text-gray-600 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" /> {property.city}
            </p>
            <p className="text-gray-600 flex items-center">
              <FaHome className="mr-2 text-indigo-600" /> {property.houseType}
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-700 mb-2">Description</h2>
          <p className="text-gray-600 mb-4">{property.description}</p>

          <h2 className="text-lg font-bold text-gray-700 mb-4">Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" /> Address: {property.address}, {property.city}
            </p>
            <p className="flex items-center">
              <FaBed className="mr-2 text-indigo-600" /> Bedrooms: {property.bedrooms}
            </p>
            <p className="flex items-center">
              <FaBath className="mr-2 text-indigo-600" /> Bathrooms: {property.bathrooms}
            </p>
            <p className="flex items-center">
              <FaParking className="mr-2 text-indigo-600" /> Parking: {property.parking}
            </p>
          </div>
        </div>

        <div className="p-6 border-2 border-gray-200 rounded-lg bg-white shadow-lg">
          <h3 className="font-bold text-xl mb-4">Booking Details</h3>
          <p className="mb-2 text-gray-600 flex items-center">
            <FaDollarSign className="mr-2 text-indigo-600" /> First Month Rental: ${property.price}
          </p>
          <p className="mb-2 text-gray-600 flex items-center">
            <FaDollarSign className="mr-2 text-indigo-600" /> Deposit: ${property.deposit}
          </p>
          <p className="font-bold mb-4 text-gray-800 flex items-center">
            <FaDollarSign className="mr-2 text-indigo-600" /> Total: ${property.price + property.deposit}
          </p>
          <p className="text-sm text-gray-500">Need help? Contact us at Info@MyHome2U.com</p>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {Book && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5 z-50">
          <div className="relative text-gray-900 bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
            <button className="absolute top-2 right-2 text-2xl font-bold" onClick={closebook}>
              <MdClose />
            </button>
            <h3 className="text-xl font-semibold mb-6 border-b pb-4">Booking Confirmation</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">House Location:</span>
                <span>{property.address}, {property.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rental Price:</span>
                <span>${property.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Deposit:</span>
                <span>${property.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span>${property.price + property.deposit}</span>
              </div>
              <div className="flex justify-between">
                <label htmlFor="visitingDate" className="font-medium">Select Visiting Date:</label>
                <input
                  type="date"
                  id="visitingDate"
                  className="border border-gray-300 rounded px-2 py-1"
                  value={visitingDate}
                  onChange={(e) => setVisitingDate(e.target.value)}
                />
              </div>
              <button
                className="bg-black text-white py-2 px-4 rounded-md w-full mt-6 hover:bg-indigo-400 transition-colors duration-300"
                onClick={handleBooking}
                disabled={processing}
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
