import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";
import { FaEdit, FaCheckCircle} from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../api";

function EditBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const getBooking = useCallback(async () => {
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

      const response = await api.get(`/api/MyHome2U/Booking/getBooking/${id}`);
      Swal.close();
      setBooking(response.data.booking);
      setStatus(response.data.booking.status); // Set initial status
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/MyHome2U/Booking/updateBooking/${id}`, { status });
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Booking status updated successfully',
      });
      navigate("/agent/Bookings");
    } catch (error) {
      console.log(error);
    }
  };

  if (!booking._id) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex flex-1">
        <AgentSidebar />
        <div className="flex-1 p-6">
          <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaEdit className="text-blue-500 mr-2" />
              Update Booking Status
            </h1>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="processing">processing</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleUpdate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaEdit className="mr-2" />
              Update Status
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBooking;
