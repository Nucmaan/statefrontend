import React, { useCallback, useEffect, useState } from "react";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaCommentAlt
} from "react-icons/fa";
import AgentSidebar from "./AgentSidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2
import api from "../api";

function AddBills() {
  const [userId, setUserId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [utilities, setUtilities] = useState("");
  const [description, setDescription] = useState(""); // Fixed state name
  const [loading, setLoading] = useState(false); // New state for loading

  const { id } = useParams();

  const fetchContract = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/contract/getSingleContract/${id}`
      );
      const contract = response.data.contract;
      setUserId(contract.user._id);
      setOwnerId(contract.owner._id);
      setPropertyId(contract.property._id);
      setMonthlyRent(contract.monthlyRent);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!utilities || !dueDate || !description) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill in all required fields before submitting.',
        confirmButtonText: 'OK'
      });
      setLoading(false);
      return;
    }

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
      const response = await api.post(
        "/api/MyHome2U/bills/AddBill",
        {
          property: propertyId,
          user: userId,
          owner: ownerId,
          amount: monthlyRent,
          utilities,
          dueDate,
          Description: description
        }
      );
      Swal.close();

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Bill added successfully',
          confirmButtonText: 'OK'
        });
        setDescription("");
        setUtilities("");
        setDueDate("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Error!',
          text: response.data.message || 'Bill not added successfully',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 px-4 py-5 bg-white sm:px-6 md:px-8 md:py-6">

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Payment and Billing Details
              </h2>

              <div className="flex items-center mb-3 sm:mb-4">
                <FaMoneyBillAlt className="text-gray-500 text-xl sm:text-2xl mr-2 sm:mr-3" />
                <label
                  htmlFor="amount"
                  className="text-base sm:text-lg font-medium text-gray-700"
                >
                  Monthly Rent Price
                </label>
              </div>
              <input
                type="number"
                value={monthlyRent}
                disabled
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600 cursor-not-allowed text-base sm:text-lg"
              />

              <div className="flex items-center mb-3 sm:mb-4">
                <FaDollarSign className="text-gray-500 text-xl sm:text-2xl mr-2 sm:mr-3" />
                <label
                  htmlFor="utilities"
                  className="text-base sm:text-lg font-medium text-gray-700"
                >
                  Utilities
                </label>
              </div>
              <input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-base sm:text-lg"
              />

              <div className="flex items-center mb-3 sm:mb-4">
                <FaCalendarAlt className="text-gray-500 text-xl sm:text-2xl mr-2 sm:mr-3" />
                <label
                  htmlFor="dueDate"
                  className="text-base sm:text-lg font-medium text-gray-700"
                >
                  Due Date
                </label>
              </div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-base sm:text-lg"
              />

              <div className="flex items-center mb-3 sm:mb-4">
                <FaCommentAlt className="text-gray-500 text-xl sm:text-2xl mr-2 sm:mr-3" />
                <label
                  htmlFor="description"
                  className="text-base sm:text-lg font-medium text-gray-700"
                >
                  Add Comment or Information About The Payment
                </label>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-md h-28 sm:h-36 resize-none text-base sm:text-lg"
              />
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white uppercase px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-base sm:text-lg`}
                disabled={loading}
              >
                {loading ? 'Adding Payment...' : 'Add Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBills;
