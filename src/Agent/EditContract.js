import React, { useCallback, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaAddressCard,
  FaBath,
  FaBed,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";
import AgentSidebar from "./AgentSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";


function EditContract() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [houseType, setHouseType] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("Active");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchContract = useCallback(async () => {
    try {
    
      const response = await api.get(`/api/MyHome2U/contract/getSingleContract/${id}`);
  
      const contract = response.data.contract;

      setName(contract.user.name);
      setPhone(contract.user.phone);
      setEmail(contract.user.email);

      setOwnerName(contract.owner.name);
      setOwnerEmail(contract.owner.email);
      setOwnerPhone(contract.owner.phone);

      setHouseType(contract.property.houseType);
      setCity(contract.property.city);
      setAddress(contract.property.address);
      setBathrooms(contract.property.bathrooms);
      setBedrooms(contract.property.bedrooms);

      setStartDate(contract.startDate.slice(0, 10)); // Ensure correct date format
      setEndDate(contract.endDate.slice(0, 10)); // Ensure correct date format
      setMonthlyRent(contract.monthlyRent);
      setDeposit(contract.deposit);
      setStatus(contract.status);
    } catch (error) {
      console.log(error);

    }
  }, [id]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      const response = await api.put(`/api/MyHome2U/contract/updateContract/${id}`, {
        startDate,
        endDate,
        monthlyRent,
        deposit,
        status,
      });

      Swal.close();

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Contract Updated',
          text: 'Contract has been updated successfully!',
        });
        navigate("/agent/contract");
      }
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AgentSidebar />
      <div className="flex-1 p-6 bg-white shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Contract</h1>
        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                </div>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                </div>
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                </div>
                <input
                  type="text"
                  value={email}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
              </div>
            </div>

            {/* Owner Information */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Owner Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />
                  <label htmlFor="ownerName" className="text-sm font-medium text-gray-700">Full Name</label>
                </div>
                <input
                  type="text"
                  value={ownerName}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <label htmlFor="ownerPhone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                </div>
                <input
                  type="text"
                  value={ownerPhone}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <label htmlFor="ownerEmail" className="text-sm font-medium text-gray-700">Email</label>
                </div>
                <input
                  type="text"
                  value={ownerEmail}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Information */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaHome className="text-gray-500 mr-2" />
                  <label htmlFor="houseType" className="text-sm font-medium text-gray-700">House Type</label>
                </div>
                <input
                  type="text"
                  value={houseType}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaCity className="text-gray-500 mr-2" />
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">Location</label>
                </div>
                <input
                  type="text"
                  value={city}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaAddressCard className="text-gray-500 mr-2" />
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                </div>
                <input
                  type="text"
                  value={address}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaBed className="text-gray-500 mr-2" />
                  <label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">Bedrooms</label>
                </div>
                <input
                  type="text"
                  value={bedrooms}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
                <div className="flex items-center">
                  <FaBath className="text-gray-500 mr-2" />
                  <label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">Bathrooms</label>
                </div>
                <input
                  type="text"
                  value={bathrooms}
                  readOnly
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-200"
                />
              </div>
            </div>

            {/* Contract Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contract Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <label htmlFor="startDate" className="text-sm font-medium text-gray-700">Start Date</label>
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</label>
                </div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                <div className="flex items-center">
                  <FaDollarSign className="text-gray-500 mr-2" />
                  <label htmlFor="monthlyRent" className="text-sm font-medium text-gray-700">Monthly Rent</label>
                </div>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                <div className="flex items-center">
                  <FaDollarSign className="text-gray-500 mr-2" />
                  <label htmlFor="deposit" className="text-sm font-medium text-gray-700">Deposit</label>
                </div>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
                <div className="flex items-center">
                  <FaAddressCard className="text-gray-500 mr-2" />
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Terminated">Terminated</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Update Contract
          </button>
        </div>
        
        </form>
      </div>
    </div>
  );
}

export default EditContract;
