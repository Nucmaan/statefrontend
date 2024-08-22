import React, { useState, useEffect, useCallback } from "react";
import AgentSidebar from "./AgentSidebar";
import { MdOutlineAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api";

const BillsAgent = () => {
  const [ownerContracts, setOwnerContracts] = useState([]);

  const { user } = useSelector((state) => state.user);

  const fetchOwnerContracts = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/contract/getOwnerContracts/${user._id}`
      );
      const activeContracts = response.data.contracts.filter(
        (contract) => contract.status === "Active"
      );

      setOwnerContracts(activeContracts);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchOwnerContracts();
  }, [fetchOwnerContracts]);

  return (
    <div className="flex min-h-screen bg-white">
      <AgentSidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 mb-4">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">Manage Monthly Bills</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left text-gray-600 font-medium text-sm md:text-base">ID</th>
                  <th className="py-2 px-3 text-left text-gray-600 font-medium text-sm md:text-base">Name</th>
                  <th className="py-2 px-3 text-left text-gray-600 font-medium text-sm md:text-base">Status</th>
                  <th className="py-2 px-3 text-center text-gray-600 font-medium text-sm md:text-base">Add Bill</th>
                </tr>
              </thead>
              <tbody>
              {ownerContracts.map((contract, index) => (
                <tr key={contract._id} className="hover:bg-gray-50 transition duration-300">
                  <td className="py-2 px-3 text-gray-700 text-sm md:text-base">{index + 1}</td>
                  <td className="py-2 px-3 text-gray-700 text-sm md:text-base">
                    {contract.user ? contract.user.name : "Unknown User"}
                  </td>
                  <td className="py-2 px-3 text-gray-700 text-sm md:text-base">{contract.status}</td>
                  <td className="py-2 px-3 text-center">
                    <Link to={`/agent/Bills/create-Bill/${contract._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 transition duration-300">
                        <MdOutlineAdd size={20} className="md:size-10" />
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
