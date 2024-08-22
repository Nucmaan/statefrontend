import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentSidebar from './AgentSidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import api from "../api";

const MyContract = () => {
  const [ownerContract, setOwnerContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  const fetchOwnerContracts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/MyHome2U/contract/getOwnerContracts/${user._id}`);
      const data = response.data.contracts;
      setOwnerContract(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    fetchOwnerContracts();
  }, [fetchOwnerContracts]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this contract?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/api/MyHome2U/contract/DeleteContract/${id}`);

        if (response.status === 200 && response.data.success) {
          Swal.fire('Deleted!', 'Your contract has been deleted.', 'success');
          setOwnerContract(ownerContract.filter(contract => contract._id !== id));
        } else {
          Swal.fire('Error', response.data.message || 'Failed to delete the contract.', 'error');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-gray-500">Loading contracts...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
        <AgentSidebar />
        <div className="overflow-x-auto w-full p-2 md:p-8">
          <div className="flex justify-between items-center py-2 md:py-4 mb-4 md:mb-6 bg-white shadow rounded-lg px-4 md:px-6">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">My Contracts</h1>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-2 md:py-3 md:px-5 text-left text-gray-700 font-semibold">ID</th>
                  <th className="py-2 px-2 md:py-3 md:px-5 text-left text-gray-700 font-semibold">Full Name</th>
                  <th className="py-2 px-2 md:py-3 md:px-5 text-left text-gray-700 font-semibold">Status</th>
                  <th className="py-2 px-2 md:py-3 md:px-5 text-left text-gray-700 font-semibold">Contract Details</th>
                  <th className="py-2 px-2 md:py-3 md:px-5 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
              {ownerContract.map((contract, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="py-2 px-2 md:py-3 md:px-5">{index + 1}</td>
                  <td className="py-2 px-2 md:py-3 md:px-5">
                    {contract.user ? contract.user.name : "No user information"}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <Link to={`/agent/contract/Read-contract/${contract._id}`} className="text-blue-500 hover:underline">
                      Read Contract
                    </Link>
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-5 flex justify-center items-center space-x-2 md:space-x-4">
                    <Link to={`/agent/contract/Edit-contract/${contract._id}`} className="text-blue-500 hover:text-blue-700">
                      <button className="p-1 md:p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="p-1 md:p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                      onClick={() => handleDelete(contract._id)}
                    >
                      <FaTrash color='red' />
                    </button>
                  </td>
                </tr>
              ))}
              {ownerContract.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 md:py-6 text-gray-500">No contracts found.</td>
                </tr>
              )}
            </tbody>
            
            </table>
          </div>
        </div>
      </div>
  );
};

export default MyContract;
