import React, { useCallback, useEffect, useState } from "react";
import AgentSidebar from "./AgentSidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import api from "../api";
import Swal from "sweetalert2";



function AgentBills() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchBills = useCallback(async () => {
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
      const response = await api.get(`/api/MyHome2U/bills/GetAllBills`);
      Swal.close();
      const filteredBills = response.data.bill.filter(
        (bill) => bill.owner._id === user._id && bill.status === 'Paid'
      );
      setBills(filteredBills);
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
    fetchBills();
  }, [fetchBills]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 bg-white p-4 md:p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              All Bills
            </h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Date Paid
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Total Paid
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Payment Method
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.paymentDate
                        ? new Date(bill.paymentDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.total}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.Description}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.paymentMethod ? bill.paymentMethod : "N/A"}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-right">
                    <Link to={`/agent/Bills/Invoice/${bill._id}`}>
                      <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-3 md:px-4 rounded-lg text-sm flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <FaDownload className="mr-2" />
                        Receipt
                      </button>
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
}

export default AgentBills;
