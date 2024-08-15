import React, { useCallback, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaCity, FaAddressCard, FaBath, FaBed, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import SideBar from './SideBar';
import { useParams } from 'react-router-dom';
 import api from "../api";
import { useSnackbar } from 'notistack';


function RenterReadContract() {
  const { enqueueSnackbar } = useSnackbar();

  const [contractData, setContractData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    description: '',
    address: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
    houseType: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    status: 'Active',
  });

  const { id } = useParams();  

  const fetchContract = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/contract/getSingleContract/${id}`);
      const contract = response.data.contract;

      setContractData({
        name: contract.user.name,
        email: contract.user.email,
        phone: contract.user.phone,
        ownerName: contract.owner.name,
        ownerEmail: contract.owner.email,
        ownerPhone: contract.owner.phone,
        houseType: contract.property.houseType,
        description: contract.property.description,
        city: contract.property.city,
        address: contract.property.address,
        title: contract.property.title,
        bathrooms: contract.property.bathrooms,
        bedrooms: contract.property.bedrooms,
        startDate: contract.startDate,
        endDate: contract.endDate,
        monthlyRent: contract.monthlyRent,
        deposit: contract.deposit,
        status: contract.status,
      });
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "server  error";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [id,enqueueSnackbar]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-white">
       
      <div className='bg-black'>
      <SideBar />
      </div>
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-black inline-block pb-2">Contract Details</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="User Information">
              <InfoItem icon={<FaUser />} label="Full Name" value={contractData.name} />
              <InfoItem icon={<FaPhone />} label="Mobile Number" value={contractData.phone} />
              <InfoItem icon={<FaEnvelope />} label="Email" value={contractData.email} />
            </Card>

            <Card title="Owner Information">
              <InfoItem icon={<FaUser />} label="Full Name" value={contractData.ownerName} />
              <InfoItem icon={<FaPhone />} label="Mobile Number" value={contractData.ownerPhone} />
              <InfoItem icon={<FaEnvelope />} label="Email" value={contractData.ownerEmail} />
            </Card>

            <Card title="Property Information">
              <InfoItem icon={<FaHome />} label="House Type" value={contractData.houseType} />
              <InfoItem icon={<FaCity />} label="Location" value={contractData.city} />
              <InfoItem icon={<FaAddressCard />} label="Address" value={contractData.address} />
              <InfoItem icon={<FaHome />} label="Title" value={contractData.title} />
              <InfoItem icon={<FaAddressCard />} label="Description" value={contractData.description} isTextArea />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem icon={<FaBed />} label="Bedrooms" value={contractData.bedrooms} />
                <InfoItem icon={<FaBath />} label="Bathrooms" value={contractData.bathrooms} />
              </div>
            </Card>

            <Card title="Contract Information">
              <InfoItem icon={<FaCalendarAlt />} label="Start Date" value={formatDate(contractData.startDate)} />
              <InfoItem icon={<FaCalendarAlt />} label="End Date" value={formatDate(contractData.endDate)} />
              <InfoItem icon={<FaDollarSign />} label="Monthly Rent" value={`$${contractData.monthlyRent}`} />
              <InfoItem icon={<FaDollarSign />} label="Deposit" value={`$${contractData.deposit}`} />
              <InfoItem icon={<FaDollarSign />} label="Status" value={contractData.status} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoItem({ icon, label, value, isTextArea }) {
  return (
    <div className="mb-6">
      <div className="flex items-center text-gray-700 mb-1">
        <div className="mr-2 text-xl">{icon}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      {isTextArea ? (
        <textarea
          readOnly
          value={value}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          rows="4"
        />
      ) : (
        <input
          type="text"
          readOnly
          value={value}
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
        />
      )}
    </div>
  );
}

export default RenterReadContract;
