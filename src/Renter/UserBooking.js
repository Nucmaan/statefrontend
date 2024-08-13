import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import api from "../api";
import Swal from 'sweetalert2';

const UserBooking = () => {
  const [userBooking, setUserBooking] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Booking/GetUserBookings/${user._id}`);
      const data = response.data.bookings;

      const filteredBookings = data.filter(booking =>
        booking.property &&
        booking.property.owner &&
        booking.property.owner.name &&
        booking.property.owner.phone &&
        booking.property.houseType &&
        booking.property.city &&
        booking.property.price
      );

      setUserBooking(filteredBookings);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'server error',
        text: error.response?.data?.message || 'An unexpected error occurred. Please try again later.',
        showConfirmButton: true,
      });
    }
  }, [user._id]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/api/MyHome2U/Booking/DeleteBooking/${id}`);
        setUserBooking((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'server error',
          text: error.response?.data?.message || 'An unexpected error occurred. Please try again later.',
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          </div>
          <div className="overflow-x-auto">
            {userBooking.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">ID</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">Owner Name</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">Phone</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">House Type</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">City</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">Price</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">Visit Date</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">House Info</th>
                    <th className="py-3 px-5 text-left text-gray-600 font-semibold">Status</th>
                    <th className="py-3 px-5 text-center text-gray-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userBooking.map((booking, index) => (
                    <tr key={booking._id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-5 text-gray-700">{booking.property.owner.name}</td>
                      <td className="py-3 px-5 text-gray-700">{booking.property.owner.phone}</td>
                      <td className="py-3 px-5 text-gray-700">{booking.property.houseType}</td>
                      <td className="py-3 px-5 text-gray-700">{booking.property.city}</td>
                      <td className="py-3 px-5 text-gray-700">${booking.property.price}</td>
                      <td className="py-3 px-5 text-gray-700">{new Date(booking.visitingDate).toLocaleDateString()}</td>
                      <td className="py-3 px-5 text-gray-700">
                        <Link to={`/user/Bookings/view-House-Information/${booking.property._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                          View Details
                        </Link>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`px-2 py-1 text-sm rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 
                          booking.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                          'bg-red-200 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <button
                          className="text-red-600 hover:text-red-800 font-semibold py-1 px-4 rounded-lg border border-red-600 hover:border-red-800 transition duration-200"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-700 text-center mt-6">
                You haven't made any bookings yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
