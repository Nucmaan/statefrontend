import React, { useCallback, useEffect, useState } from "react";
import AgentSidebar from "./AgentSidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import api from "../api";

function AgentBills() {
  const [bills, setBills] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/GetAllBills`);
      
      const filteredBills = response.data.bill.filter(
        (bill) => bill.owner && bill.owner._id === user._id && bill.status === 'Paid'
      );
  
      setBills(filteredBills);
      
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return (
    <div className="flex min-h-screen bg-white">
      <AgentSidebar />
        <div className="overflow-x-auto w-full p-4 md:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              All Bills
            </h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Date Paid
                  </th>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Total Paid
                  </th>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Payment Method
                  </th>
                  <th className="py-1 sm:py-2 md:py-3 px-2 sm:px-3 md:px-4 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-gray-700">
                      {bill.paymentDate
                        ? new Date(bill.paymentDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-gray-700">
                      {bill.total}
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-gray-700">
                      {bill.Description}
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-gray-700">
                      {bill.paymentMethod ? bill.paymentMethod : "N/A"}
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4 text-right">
                      <Link to={`/agent/Bills/Invoice/${bill._id}`}>
                        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-1 sm:py-2 md:py-2 px-2 sm:px-3 md:px-4 rounded-lg text-xs sm:text-sm flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                          <FaDownload className="mr-1 sm:mr-2" />
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
  );
}

export default AgentBills;
