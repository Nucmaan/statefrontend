import React, { useState, useEffect, useCallback } from "react";
import AgentSidebar from "./AgentSidebar";
import { MdOutlineAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const BillsAgent = () => {
  const [ownerContracts, setOwnerContracts] = useState([]);

  const { user } = useSelector((state) => state.user);

  const fetchOwnerContracts = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/MyHome2U/contract/getOwnerContracts/${user._id}`
      );
      const activeContracts = response.data.contracts.filter(
        (contract) => contract.status === "Active"
      );
      setOwnerContracts(activeContracts);
    } catch (error) {
      console.error("Error fetching owner contracts:", error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchOwnerContracts();
  }, [fetchOwnerContracts]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AgentSidebar />
      <div className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Manage Monthly Bills</h1>
          
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">ID</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Status</th>
                  <th className="py-3 px-4 text-center text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ownerContracts.map((contract, index) => (
                  <tr key={contract._id} className="hover:bg-gray-50 transition duration-300">
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-700">{contract.user.name}</td>
                    <td className="py-3 px-4 text-gray-700">{contract.status}</td>
                    <td className="py-3 px-4 text-center">
                      <Link to={`/agent/Bills/create-Bill/${contract._id}`}>
                        <button className="text-blue-500 hover:text-blue-700 transition duration-300">
                          <MdOutlineAdd size={24} />
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
};

export default BillsAgent;