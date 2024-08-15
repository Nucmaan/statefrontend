import React, { useCallback, useEffect, useState } from 'react';
import {
  FaUser, FaEnvelope, FaPhone, FaHome, FaCity, FaAddressCard, FaBath, FaBed, FaDollarSign, FaCalendarAlt, FaTag
} from 'react-icons/fa';

import AgentSidebar from './AgentSidebar';
import { useParams } from 'react-router-dom';
import api from "../api";


function ReadContract() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [houseType, setHouseType] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [status, setStatus] = useState('Active');

  const { id } = useParams();

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
      setStartDate(contract.startDate);
      setEndDate(contract.endDate);
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

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AgentSidebar />
      <div className="flex-1 bg-white p-8 lg:p-12 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Contract Information</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium text-gray-700">Full Name:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{name}</p>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-500" />
                <span className="font-medium text-gray-700">Mobile Number:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{phone}</p>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-500" />
                <span className="font-medium text-gray-700">Email:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{email}</p>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-500" />
                <span className="font-medium text-gray-700">Full Name:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{ownerName}</p>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-500" />
                <span className="font-medium text-gray-700">Mobile Number:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{ownerPhone}</p>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-500" />
                <span className="font-medium text-gray-700">Email:</span>
              </div>
              <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{ownerEmail}</p>
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaHome className="text-gray-500" />
                  <span className="font-medium text-gray-700">House Type:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{houseType}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaCity className="text-gray-500" />
                  <span className="font-medium text-gray-700">City:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{city}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaAddressCard className="text-gray-500" />
                  <span className="font-medium text-gray-700">Address:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{address}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaBed className="text-gray-500" />
                  <span className="font-medium text-gray-700">Bedrooms:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{bedrooms}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaBath className="text-gray-500" />
                  <span className="font-medium text-gray-700">Bathrooms:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{bathrooms}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaDollarSign className="text-gray-500" />
                  <span className="font-medium text-gray-700">Monthly Rent:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{monthlyRent}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaDollarSign className="text-gray-500" />
                  <span className="font-medium text-gray-700">Deposit:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{deposit}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="font-medium text-gray-700">Start Date:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{formatDate(startDate)}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="font-medium text-gray-700">End Date:</span>
                </div>
                <p className="p-2 border border-gray-300 rounded-md bg-gray-50">{formatDate(endDate)}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaTag className="text-gray-500" />
                  <span className="font-medium text-gray-700">Status:</span>
                </div>
                <p className={`p-2 border rounded-md ${status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadContract;
