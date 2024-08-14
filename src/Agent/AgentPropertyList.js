import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  PropertyListSuccess,
  DeletePropertyStart,
  DeletePropertySuccess,
} from "../Redux/PropertyList/PropertySlice.js";
import api from "../api";


const AgentPropertyList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { propertyList, loading, error } = useSelector(
    (state) => state.propertyList
  );

  const fetchProperties = useCallback(async () => {
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
      const response = await api.get("/api/MyHome2U/property/getallproperty");
      Swal.close();
      dispatch(PropertyListSuccess(response.data.properties));
    } catch (error) {
      enqueueSnackbar("Failed to fetch properties", { variant: "error" });
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const deleteProperty = async (id) => {
    dispatch(DeletePropertyStart());
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
      const response = await api.delete(`/api/MyHome2U/property/deleteproperty/${id}`);
      Swal.close();
      if (response.status === 200) {
        dispatch(DeletePropertySuccess(id));
        enqueueSnackbar("Property deleted successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to delete property", { variant: "error" });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <AgentSidebar />
        <div className="flex-1 bg-white p-6">
          <div className="flex justify-between items-center py-3 px-2 border-x-2 border-t-2 border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800">My Listings</h1>
            <Link to="/agent/property-list/add-property">
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                <FaPlus className="mr-2" />
                Add New Listing
              </button>
            </Link>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="py-3 px-4 text-left font-semibold">#</th>
                    <th className="py-3 px-4 text-left font-semibold">Address</th>
                    <th className="py-3 px-4 text-left font-semibold">City</th>
                    <th className="py-3 px-4 text-left font-semibold">Bedrooms</th>
                    <th className="py-3 px-4 text-left font-semibold">Bathrooms</th>
                    <th className="py-3 px-4 text-left font-semibold">Price</th>
                    <th className="py-3 px-4 text-left font-semibold">Deposit</th>
                    <th className="py-3 px-4 text-left font-semibold">Type</th>
                    <th className="py-3 px-4 text-left font-semibold">Status</th>
                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyList && propertyList.length > 0 ? (
                    propertyList
                      .filter((listing) => listing.owner === user._id)
                      .map((listing, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{listing.address}</td>
                          <td className="py-3 px-4">{listing.city}</td>
                          <td className="py-3 px-4">{listing.bedrooms}</td>
                          <td className="py-3 px-4">{listing.bathrooms}</td>
                          <td className="py-3 px-4">${listing.price.toLocaleString()}</td>
                          <td className="py-3 px-4">${listing.deposit.toLocaleString()}</td>
                          <td className="py-3 px-4">{listing.houseType}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                listing.status === "Available"
                                  ? "bg-green-100 text-green-700"
                                  : listing.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : listing.status === "Sold" || listing.status === "Rented"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {listing.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 flex space-x-2">
                            <Link to={`/agent/property-list/edit-property/${listing._id}`}>
                              <button className="text-blue-500 hover:text-blue-700">
                                <FaEdit />
                              </button>
                            </Link>
                            <Link to={`/agent/Bookings/House-Details/${listing._id}`}>
                              <button className="text-green-500 hover:text-green-700">
                                <FaEye />
                              </button>
                            </Link>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(listing._id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="py-4 px-4 text-center text-gray-500">
                        No listings available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentPropertyList;
