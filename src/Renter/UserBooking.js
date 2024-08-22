import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import api from "../api";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";


const UserBooking = () => {
  const [userBooking, setUserBooking] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/Booking/GetUserBookings/${user._id}`
      );
      const data = response.data.bookings;

      const filteredBookings = data.filter(
        (booking) =>
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
      const errorMessage =
        error.response?.data?.message || "You haven't made any bookings yet.";
      enqueueSnackbar(errorMessage, { variant: "success" });
    }
  }, [user._id, enqueueSnackbar]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/MyHome2U/Booking/DeleteBooking/${id}`);
          setUserBooking((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== id)
          );
          Swal.fire(
            'Cancelled!',
            'Your booking has been cancelled.',
            'success'
          );
        } catch (error) {
          enqueueSnackbar("Failed to cancel the booking.", { variant: "error" });
        }
      }
    });
  };
  

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="overflow-x-auto w-full p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          My Bookings
        </h1>
        {userBooking.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="py-3 px-5 text-left font-semibold">ID</th>
                  <th className="py-3 px-5 text-left font-semibold">Owner Name</th>
                  <th className="py-3 px-5 text-left font-semibold">Phone</th>
                  <th className="py-3 px-5 text-left font-semibold">House Type</th>
                  <th className="py-3 px-5 text-left font-semibold">City</th>
                  <th className="py-3 px-5 text-left font-semibold">Price</th>
                  <th className="py-3 px-5 text-left font-semibold">Visit Date</th>
                  <th className="py-3 px-5 text-left font-semibold">House Info</th>
                  <th className="py-3 px-5 text-left font-semibold">Status</th>
                  <th className="py-3 px-5 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userBooking.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-indigo-50 transition-colors`}
                  >
                    <td className="py-4 px-5 text-gray-800 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      {booking.property.owner.name}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      {booking.property.owner.phone}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      {booking.property.houseType}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      {booking.property.city}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      ${booking.property.price}
                    </td>
                    <td className="py-4 px-5 text-gray-800">
                      {new Date(booking.visitingDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-5 text-indigo-600 hover:text-indigo-800">
                      <Link
                        to={`/user/Bookings/view-House-Information/${booking.property._id}`}
                        className="font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-200 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <button
                        className="text-red-600 hover:text-red-800 font-semibold py-2 px-4 rounded-lg border border-red-600 hover:border-red-800 transition duration-200"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-700 text-center mt-6">
            You haven't made any bookings yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBooking;
