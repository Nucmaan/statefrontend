import React, { useCallback, useEffect, useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaDollarSign,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";
import AgentSidebar from "./AgentSidebar";
import api from "../api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AgentDashboard = () => {
  const [ownerContract, setOwnerContract] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [propertyList, setPropertyList] = useState([]);
  const [propertySold, setPropertySold] = useState([]);
  const [propertyToRent, setPropertyToRent] = useState([]);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/property/getallproperty");
      const filteredProperties = response.data.properties.filter(
        (property) => property.owner === user._id
      );
      setPropertyList(filteredProperties);
      
      setPropertySold(
        response.data.properties.filter(
          (property) =>
            property.owner === user._id && property.status === "Rented"
        ));

        setPropertyToRent(
          response.data.properties.filter(
            (property) =>
              property.owner === user._id && property.status === "Available"
          ));
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const fetchOwnerContracts = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/contract/getOwnerContracts/${user._id}`
      );
      const data = response.data.contracts;
      setOwnerContract(data);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchOwnerContracts();
  }, [fetchOwnerContracts]);

  const [totalAmount, setTotalAmount] = useState(0); // All-time total
  const [monthlyTotal, setMonthlyTotal] = useState(0); // Current month's total

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/bills/GetAllBills`);
      
      // Filter bills where the owner ID matches
      const filteredBills = response.data.bill.filter(
        (bill) => bill.owner && bill.owner._id === user._id
      );

      // Calculate the total amount for 'Paid' bills
      const total = filteredBills
        .filter(bill => bill.status === 'Paid')
        .reduce((sum, bill) => sum + bill.total, 0);

      // Calculate the total amount for 'Paid' bills this month
      const currentMonth = new Date().getMonth();
      const monthlyTotal = filteredBills
        .filter(bill => bill.status === 'Paid' && new Date(bill.paymentDate).getMonth() === currentMonth)
        .reduce((sum, bill) => sum + bill.total, 0);

      // Update state with the totals
      setTotalAmount(total);
      setMonthlyTotal(monthlyTotal);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Agent Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Listings */}
            <div className="bg-blue-500 shadow-lg rounded-lg p-6 text-white">
              <FaHome className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Total Listings</h2>
              <p className="text-xl">{propertyList.length}</p>
            </div>
            {/* Active Contracts */}
            <div className="bg-green-500 shadow-lg rounded-lg p-6 text-white">
              <FaClipboardList className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Active Contracts</h2>
              <p className="text-xl">{ownerContract.length}</p>
            </div>
          
            {/* Monthly Revenue */}
            <div className="bg-purple-500 shadow-lg rounded-lg p-6 text-white">
              <FaDollarSign className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Monthly Revenue</h2>
              <p className="text-xl">${monthlyTotal}</p>
              <p className="text-sm">This Month</p>
            </div>

            {/* All-Time Revenue */}
            <div className="bg-teal-500 shadow-lg rounded-lg p-6 text-white">
              <FaDollarSign className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">All-Time Revenue</h2>
              <p className="text-xl">${totalAmount}</p>
            </div>
        
            <div className="bg-yellow-500 shadow-lg rounded-lg p-6 text-white">
              <FaClipboardCheck className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
               Available Properties
              </h2>
              <p className="text-xl">{propertyToRent.length}</p>
            </div>
            {/* Properties Sold */}
            <div className="bg-indigo-500 shadow-lg rounded-lg p-6 text-white">
              <FaCheckCircle className="text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Properties Rented</h2>
              <p className="text-xl">{propertySold.length}</p>
            </div>
          
          </div>

          {/* Recent Activities Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Activities
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>Property at 123 Main St was listed.</span>
                  <span className="text-sm text-gray-600">2 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Contract with Jane Doe was signed.</span>
                  <span className="text-sm text-gray-600">4 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Appointment with John Smith scheduled.</span>
                  <span className="text-sm text-gray-600">1 day ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Booking request for 456 Elm St was confirmed.</span>
                  <span className="text-sm text-gray-600">3 days ago</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600">
                <Link to="/agent/property-list/add-property">
                  Add New Listing
                </Link>
              </button>

              <button className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600">
                <Link to="/agent/Bookings">Create New Contract</Link>
              </button>
              <button className="bg-orange-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-orange-600">
                <Link to="/agent/Bills-List">Add Bills</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
