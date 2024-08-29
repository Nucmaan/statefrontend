import React, { useCallback, useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import AgentSidebar from "./AgentSidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";
import { useSnackbar } from "notistack";

function AgentPayments() {
  const [bills, setBills] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState([null, null]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/GetAllBills`);
      const filteredBills = response.data.bill.filter(
        (bill) => bill.owner && bill.owner._id === user._id
      );
      setBills(filteredBills);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "No payment information available";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [user._id, enqueueSnackbar]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const filteredBills = bills
    .filter((bill) =>
      bill.user?.name?.toLowerCase().includes(filterName.toLowerCase())
    )
    .filter((bill) =>
      bill.status?.toLowerCase().includes(filterStatus.toLowerCase())
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
    <div className="flex min-h-screen bg-black">
      <AgentSidebar />
      <div className="overflow-x-auto w-full p-4 md:p-8 bg-white">
        <div className="mb-3 flex flex-col items-start md:items-center md:flex-row md:justify-between">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Payments Overview
            </h1>
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-auto items-start md:items-center">
            <input
              type="text"
              placeholder="Filter by name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 md:mr-4 w-full md:w-auto text-sm md:text-base"
            />
            <input
              type="text"
              placeholder="Filter by status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 md:mr-4 w-full md:w-auto text-sm md:text-base"
            />
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 md:mr-4 w-full md:w-auto text-sm md:text-base">
              <BsCalendarDate className="text-gray-600 mr-2" />
              <DatePicker
                selected={filterDate[0]}
                onChange={(dates) => setFilterDate(dates)}
                startDate={filterDate[0]}
                endDate={filterDate[1]}
                selectsRange
                isClearable
                placeholderText="Select date range"
                className="border-0 outline-none w-full md:w-auto text-sm md:text-base"
              />
            </div>
            <FaSearch className="text-gray-600 ml-2 md:ml-0" />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-4">
            <div>
              <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                Total Paid: ${totalPaid.toFixed(2)}
              </h2>
              <h2 className="text-sm md:text-lg font-semibold text-gray-800">
                Total Unpaid: ${totalUnpaid.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  House Name
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Full Name
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Due Date
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill._id} className="border-b border-gray-200">
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    {bill.property?.name || "N/A"}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    {bill.user?.name || "N/A"}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    ${bill.total.toFixed(2)}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    {bill.status || "N/A"}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    {new Date(bill.dueDate).toLocaleDateString() || "N/A"}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-800">
                    <Link
                    to={`/agent/Bills/update-Bill/${bill._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="inline" /> Edit
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

export default AgentPayments;
