import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import api from "../api";


const RenterContracts = () => {
  const [userContract, setUserContract] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchUserContracts = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/contract/getUserContracts/${user._id}`);
      const data = response.data.contracts;
      setUserContract(data);
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
    fetchUserContracts();
  }, [fetchUserContracts]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Contracts</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-5 text-left text-gray-600 font-semibold">ID</th>
                  <th className="py-3 px-5 text-left text-gray-600 font-semibold">Owner Name</th>
                  <th className="py-3 px-5 text-left text-gray-600 font-semibold">Status</th>
                  <th className="py-3 px-5 text-left text-gray-600 font-semibold">Contract Details</th>
                </tr>
              </thead>
              <tbody>
                {userContract.map((contract, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-5 text-gray-700">{contract.owner.name}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        contract.status === 'Active' ? 'bg-green-200 text-green-800' : 
                        contract.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 
                        'bg-red-200 text-red-800'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <Link to={`/user/contract/read-contract/${contract._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View Details
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
};

export default RenterContracts;
