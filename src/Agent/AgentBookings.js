import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentSidebar from './AgentSidebar';
import { FaEdit, FaTrash, FaFileContract } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import api from "../api";

const AgentBookings = () => {
  const [userBooking, setUserBooking] = useState([]);
  
  const { user } = useSelector((state) => state.user);

  const fetchUserBookings = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Booking/GetAgentBookings/${user._id}`);
      const data = response.data.agentBookings;
      setUserBooking(data);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This booking will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await api.delete(`/api/MyHome2U/Booking/DeleteSingleBooking/${id}`);
        if (response.status === 200) {
          setUserBooking(prevBookings => prevBookings.filter(booking => booking._id !== id));
          Swal.fire(
            'Deleted!',
            'The booking has been deleted.',
            'success'
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AgentSidebar />
      <div className="overflow-x-auto w-full p-4 md:p-8">
        <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Agent Bookings</h1>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">ID</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">User Name</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Mobile</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">House Type</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Address</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">City</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Price</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Details</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Visiting Date</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-left text-gray-700 font-medium">Status</th>
                <th className="py-2 px-2 md:py-3 md:px-4 text-center text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userBooking.map((booking, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">{index + 1}</td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.user?.name || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.user?.phone || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.property?.houseType || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.property?.address || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.property?.city || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    ${booking.property?.price || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4">
                    <Link to={`/agent/Bookings/House-Details/${booking.property?._id}`} className="text-blue-600 hover:underline">
                      View Details
                    </Link>
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.visitingDate ? new Date(booking.visitingDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-gray-800">
                    {booking.status || 'N/A'}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center flex space-x-2 md:space-x-3">
                    <Link
                      to={`/agent/Booking/update-Booking/${booking._id}`}
                      className="p-1 md:p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors duration-300"
                      title="Edit Booking"
                    >
                      <FaEdit className="text-lg md:text-xl" />
                    </Link>
                    <button
                      className="p-1 md:p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-300"
                      onClick={() => handleDelete(booking._id)}
                      title="Delete Booking"
                    >
                      <FaTrash className="text-lg md:text-xl" />
                    </button>
                    <Link
                      to={`/agent/Booking/Add-Contract/${booking._id}`}
                      className="p-1 md:p-2 text-green-500 hover:bg-green-100 rounded-full transition-colors duration-300"
                      title="Add Contract"
                    >
                      <FaFileContract className="text-lg md:text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentBookings;
