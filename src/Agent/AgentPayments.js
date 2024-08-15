import React, { useCallback, useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import AgentSidebar from "./AgentSidebar"; // Make sure this path and export are correct
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";



function AgentPayments() {
  const [bills, setBills] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState([null, null]);
  const { user } = useSelector((state) => state.user);

  const fetchBills = useCallback(async () => {
    try {
    
      const response = await api.get(`/api/MyHome2U/bills/GetAllBills`);
      const filteredBills = response.data.bill.filter(
        (bill) => bill.owner._id === user._id
      );
      setBills(filteredBills);
    } catch (error) {
    console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  // Filter bills based on the input values
  const filteredBills = bills
    .filter((bill) =>
      bill.user.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .filter((bill) =>
      bill.status.toLowerCase().includes(filterStatus.toLowerCase())
    )
    .filter((bill) => {
      if (!filterDate[0] || !filterDate[1]) return true;
      const dueDate = new Date(bill.dueDate);
      return dueDate >= filterDate[0] && dueDate <= filterDate[1];
    });

  // Calculate totals
  const totalPaid = filteredBills
    .filter((bill) => bill.status === "Paid")
    .reduce((acc, bill) => acc + bill.total, 0);
  const totalUnpaid = filteredBills
    .filter((bill) => bill.status !== "Paid")
    .reduce((acc, bill) => acc + bill.total, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
          <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Payments Overview
            </h1>
            <div className="flex items-center mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Filter by name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mr-4"
              />
              <input
                type="text"
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mr-4"
              />
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mr-4">
                <BsCalendarDate className="text-gray-600 mr-2" />
                <DatePicker
                  selected={filterDate[0]}
                  onChange={(dates) => setFilterDate(dates)}
                  startDate={filterDate[0]}
                  endDate={filterDate[1]}
                  selectsRange
                  isClearable
                  placeholderText="Select date range"
                  className="border-0 outline-none"
                />
              </div>
              <FaSearch className="text-gray-600" />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Total Paid: ${totalPaid.toFixed(2)}
                </h2>
                <h2 className="text-lg font-semibold text-gray-800">
                  Total Unpaid: ${totalUnpaid.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">House Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Full Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Utilities</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Total</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Due Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Payment Method</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="py-3 px-3 md:py-4 md:px-4 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{bill.property.title}</td>
                    <td className="py-3 px-4 text-gray-700">{bill.user.name}</td>
                    <td className="py-3 px-4 text-gray-700">${bill.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700">${bill.utilities.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700">${bill.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700">{new Date(bill.dueDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {bill.paymentDate ? new Date(bill.paymentDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{bill.paymentMethod || "N/A"}</td>
                    <td className={`py-3 px-4 text-gray-700 ${bill.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {bill.status}
                    </td>
                    <td className="py-3 px-3 md:py-4 md:px-4 text-right">
                      <Link to={`/agent/Bills/update-Bill/${bill._id}`}>
                        <button className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg py-2 px-4">
                          <FaEdit />
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

export default AgentPayments;
