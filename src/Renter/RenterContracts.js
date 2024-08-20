import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import api from "../api";
import { useSnackbar } from "notistack";

const RenterContracts = () => {
  const [userContract, setUserContract] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const fetchUserContracts = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/contract/getUserContracts/${user._id}`
      );
      const data = response.data.contracts;
      setUserContract(data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "You don't have any contract information here";
      enqueueSnackbar(errorMessage, { variant: "success" });
    }
  }, [user._id, enqueueSnackbar]);

  useEffect(() => {
    fetchUserContracts();
  }, [fetchUserContracts]);

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="overflow-x-auto w-full p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          My Contracts
        </h1>
        {userContract.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-indigo-500 text-white">
              <tr>
              <th className="py-2 px-5 text-left font-semibold text-sm md:text-base">
                ID
              </th>
              <th className="py-2 px-5 text-left font-semibold text-sm md:text-base">
                Owner Name
              </th>
              <th className="py-2 px-5 text-left font-semibold text-sm md:text-base">
                Status
              </th>
              <th className="py-2 px-5 text-left font-semibold text-sm md:text-base">
                Contract Details
              </th>
            </tr>
              </thead>
              <tbody>
                {userContract.map((contract, index) => (
                  <tr key={index} className="bg-gray-100 hover:bg-indigo-50 transition-colors">
                    <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-5 text-gray-700">
                      {contract.owner.name}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-2 py-1 text-sm rounded-full ${
                          contract.status === "Active"
                            ? "bg-green-200 text-green-800"
                            : contract.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <Link
                        to={`/user/contract/read-contract/${contract._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg text-gray-600">
            You have no contract information yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default RenterContracts;
