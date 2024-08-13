import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import SideBar from "./SideBar";
import Swal from "sweetalert2";
import api from "../api";

function RenterPayments() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/getUserBills/${user._id}`);
      const paidBills = response.data.bills.filter(bill => bill.status === 'Paid');
      setBills(paidBills);
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
        <SideBar />
        <div className="flex-1 bg-white p-4 md:p-6 shadow-lg">
          <div className="flex justify-between items-center border-x border-t border-gray-200">
            <div className="flex flex-col">
              <div className="px-3 pb-5 pt-2">
                <h1 className="text-sm md:text-2xl font-bold text-gray-800">
                  Payments
                </h1>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="border-b border-gray-100">
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
                  <th className="py-2 px-3 md:py-4 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Payment Method
                  </th>
                  <th className="py-2 px-3 md:py-4 md:px-4 text-left text-sm font-semibold text-gray-600">
                    Action
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
                      {new Date(bill.paymentDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      ${bill.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.Description}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-gray-700">
                      {bill.paymentMethod}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-right">
                      <Link to={`/user/Payments/invoice/${bill._id}`}>
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

export default RenterPayments;
