import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import SideBar from "./SideBar";
import api from "../api";
import { useSnackbar } from "notistack";

function RenterPayments() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/getUserBills/${user._id}`);
      const paidBills = response.data.bills.filter(bill => bill.status === 'Paid');
      setBills(paidBills);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Server error";
      enqueueSnackbar(errorMessage, { variant: "success" });
    }
  }, [user._id, enqueueSnackbar]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return (
    <div className="flex  min-h-screen bg-white">
        <SideBar />
        <div className="overflow-x-auto w-full p-4 md:p-5">
        <h1 className="text-sm md:text-2xl font-bold text-gray-800 text-center pb-3">
        Payments
      </h1>
          {bills.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-indigo-500 text-white border-b border-gray-100">
                  <tr>
                    <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold ">
                      ID
                    </th>
                    <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold ">
                      Date Paid
                    </th>
                    <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold">
                      Total Paid
                    </th>
                    <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm font-semibold ">
                      Description
                    </th>
                    <th className="py-2 px-3 md:py-4 md:px-4 text-left text-sm font-semibold">
                      Payment Method
                    </th>
                    <th className="py-2 px-3 md:py-4 md:px-4 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill, index) => (
                    <tr key={index} className="bg-gray-100 hover:bg-indigo-50 transition-colors">
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
          ) : (
            <p className="text-lg text-gray-600 mt-4">You don't have any payments yet.</p>
          )}
        </div>
      </div>
  );
}

export default RenterPayments;
