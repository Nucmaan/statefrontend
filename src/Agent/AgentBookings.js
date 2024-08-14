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
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait.........',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const response = await api.get(`/api/MyHome2U/Booking/GetAgentBookings/${user._id}`);
      Swal.close()
      const data = response.data.agentBookings;
      setUserBooking(data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'You have no Booking try agin.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <AgentSidebar />
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
          <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3">
            <h1 className="text-3xl font-bold text-gray-900">Agent Bookings</h1>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">User Name</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Mobile</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">House Type</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Address</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">City</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Price</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Details</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Visiting Date</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Status</th>
                  <th className="py-3 px-4 text-center text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userBooking.map((booking, index) => (
                  <tr key={index} >
                    <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.user.name}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.user.phone}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.property.houseType}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.property.address}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.property.city}</td>
                    <td className="py-3 px-4 text-gray-800">${booking.property.price}</td>
                    <td className="py-3 px-4">
                      <Link to={`/agent/Bookings/House-Details/${booking.property._id}`} className="text-blue-600 hover:underline">
                        View Details
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{new Date(booking.visitingDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-gray-800">{booking.status}</td>
                    <td className="py-3 px-4 text-center flex space-x-3">
                      <Link
                        to={`/agent/Booking/update-Booking/${booking._id}`}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors duration-300"
                        title="Edit Booking"
                      >
                        <FaEdit className="text-xl" />
                      </Link>
                      <button
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-300"
                        onClick={() => handleDelete(booking._id)}
                        title="Delete Booking"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                      <Link
                        to={`/agent/Booking/Add-Contract/${booking._id}`}
                        className="p-2 text-green-500 hover:bg-green-100 rounded-full transition-colors duration-300"
                        title="Add Contract"
                      >
                        <FaFileContract className="text-xl" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBookings;
