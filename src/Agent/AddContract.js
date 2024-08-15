import React, { useCallback, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaCity, FaBath, FaBed, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import AgentSidebar from './AgentSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from "../api";

function AddContract() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [title, setTitle] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [houseType, setHouseType] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerId, setOwnerId] = useState("");

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [status, setStatus] = useState('Active');
  const Navigate = useNavigate();

  const { id } = useParams();  

  const FetchBooking = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Booking/singleBookingInfo/${id}`);
    
      console.log(response.data.booking);
      setName(response.data.booking.user.name);
      setUserId(response.data.booking.user._id);
      setPhone(response.data.booking.user.phone);
      setEmail(response.data.booking.user.email);

      setOwnerName(response.data.booking.property.owner.name);
      setOwnerId(response.data.booking.property.owner._id);
      setOwnerEmail(response.data.booking.property.owner.email);
      setOwnerPhone(response.data.booking.property.owner.phone);

      setHouseType(response.data.booking.property.houseType);
      setPropertyId(response.data.booking.property._id);
      setCity(response.data.booking.property.city);
      setAddress(response.data.booking.property.address);
      setTitle(response.data.booking.property.title);
      setBathrooms(response.data.booking.property.bathrooms);
      setBedrooms(response.data.booking.property.bedrooms);

    } catch (error) {
    console.log(error);
    }
  }, [id]);

  useEffect(() => {
    FetchBooking();
  }, [FetchBooking]);

  const validateForm = () => {
    if (!startDate || !endDate || !monthlyRent || !deposit || !status) {
      return false;
    }
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

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

      const response = await api.post("/api/MyHome2U/contract/createContract", {
        property: propertyId,
        user: userId,
        owner: ownerId,
        startDate: startDate,
        endDate: endDate,
        monthlyRent: monthlyRent,
        deposit: deposit,
        status: status
      });

      Swal.close();

      if (response.status === 200) {
        Navigate("/agent/bookings");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An unexpected error occurred.',
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
        <div className="flex-1 bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Contract Information</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <label className="block text-xl font-medium text-gray-800 text-center mb-2">User Information</label>
                <div className="flex items-center mb-4">
                  <FaUser className="text-gray-500 mr-2" />
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                </div>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaPhone className="text-gray-500 mr-2" />
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                </div>
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                </div>
                <input
                  type="text"
                  value={email}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
              </div>

              {/* Owner Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <label className="block text-xl font-medium text-gray-800 text-center mb-2">Owner Information</label>
                <div className="flex items-center mb-4">
                  <FaUser className="text-gray-500 mr-2" />
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Full Name</label>
                </div>
                <input
                  type="text"
                  value={ownerName}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaPhone className="text-gray-500 mr-2" />
                  <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                </div>
                <input
                  type="text"
                  value={ownerPhone}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">Email</label>
                </div>
                <input
                  type="text"
                  value={ownerEmail}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <label className="block text-xl font-medium text-gray-800 text-center mb-2">Property Information</label>
                <div className="flex items-center my-4">
                  <FaHome className="text-gray-500 mr-2" />
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                </div>
                <input
                  type="text"
                  value={title}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaCity className="text-gray-500 mr-2" />
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                </div>
                <input
                  type="text"
                  value={address}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaCity className="text-gray-500 mr-2" />
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                </div>
                <input
                  type="text"
                  value={city}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaBed className="text-gray-500 mr-2" />
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                </div>
                <input
                  type="text"
                  value={bedrooms}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaBath className="text-gray-500 mr-2" />
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                </div>
                <input
                  type="text"
                  value={bathrooms}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
                <div className="flex items-center my-4">
                  <FaDollarSign className="text-gray-500 mr-2" />
                  <label htmlFor="houseType" className="block text-sm font-medium text-gray-700">House Type</label>
                </div>
                <input
                  type="text"
                  value={houseType}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-200"
                />
              </div>
              {/* Contract Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <label className="block text-xl font-medium text-gray-800 text-center mb-2">Contract Information</label>
                <div className="flex items-center my-4">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                </div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <div className="flex items-center my-4">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                </div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <div className="flex items-center my-4">
                  <FaDollarSign className="text-gray-500 mr-2" />
                  <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">Monthly Rent</label>
                </div>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <div className="flex items-center my-4">
                  <FaDollarSign className="text-gray-500 mr-2" />
                  <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Deposit</label>
                </div>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
                <div className="flex items-center my-4">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Terminated">Terminated</option>
                  <option value="Inactive">Inactive</option>

                </select>
              </div>
            </div>
          <div className='w-full'>
          <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          CREATE NEW CONTRACT
        </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContract;
