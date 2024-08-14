import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import Swal from 'sweetalert2';

import {

  PropertyListSuccess,
  
} from "../Redux/PropertyList/PropertySlice.js";

const Listings = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { propertyList, loading, error } = useSelector(
    (state) => state.propertyList
  );

  const fetchProperties = useCallback(async () => {
  
    try {
      const response = await api.get("/api/MyHome2U/property/getallproperty");
      dispatch(PropertyListSuccess(response.data.properties));
    } catch (error) {

      enqueueSnackbar("Failed to fetch properties", { variant: "error" });
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const deleteProperty = async (id) => {

    try {
      const response = await api.delete(`/api/MyHome2U/property/deleteproperty/${id}`);
      if (response.status === 200) {
      
        enqueueSnackbar("Property deleted successfully", { variant: "success" });
      }
    } catch (error) {

      enqueueSnackbar("Failed to delete property", { variant: "error" });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Listings</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    {["ID", "Title", "Address", "City", "Bedrooms", "Bathrooms", "Price", "Deposit", "House Type", "Parking", "Status", "Actions"].map((header) => (
                      <th key={header} className="py-3 px-4 text-left text-gray-600 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {propertyList && propertyList.length > 0 ? (
                    propertyList.map((listing, index) => (
                      <tr key={listing._id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{listing.title}</td>
                        <td className="py-2 px-4">{listing.address}</td>
                        <td className="py-2 px-4">{listing.city}</td>
                        <td className="py-2 px-4">{listing.bedrooms}</td>
                        <td className="py-2 px-4">{listing.bathrooms}</td>
                        <td className="py-2 px-4">${listing.price}</td>
                        <td className="py-2 px-4">${listing.deposit}</td>
                        <td className="py-2 px-4">{listing.houseType}</td>
                        <td className="py-2 px-4">{listing.parking}</td>
                        <td className="py-2 px-4">{listing.status}</td>
                        <td className="py-2 px-4 flex space-x-2">
                          <Link to={`/admin/listing/edit-listing/${listing._id}`}>
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <FaEdit size={18} />
                            </button>
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-800 transition-colors"
                            onClick={() => handleDelete(listing._id)}
                          >
                            <FaTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="py-2 px-4 text-center text-gray-600">No listings available</td>
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

export default Listings;
