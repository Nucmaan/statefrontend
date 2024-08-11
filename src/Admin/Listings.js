import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  PropertyListStart,
  PropertyListSuccess,
  PropertyListFailure,
  DeletePropertyStart,
  DeletePropertySuccess,
  DeletePropertyFailure,
} from "../Redux/PropertyList/PropertySlice.js";

const Listings = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { propertyList, loading, error } = useSelector(
    (state) => state.propertyList
  );

  const fetchProperties = useCallback(async () => {
    dispatch(PropertyListStart());
    try {
      const response = await axios.get("/api/MyHome2U/property/getallproperty");
      dispatch(PropertyListSuccess(response.data.properties));
    } catch (error) {
      dispatch(PropertyListFailure("Failed to fetch properties"));
      enqueueSnackbar("Failed to fetch properties", { variant: "error" });
    }
  }, [dispatch, enqueueSnackbar]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const deleteProperty = async (id) => {
    dispatch(DeletePropertyStart());
    try {
      const response = await axios.delete(`/api/MyHome2U/property/deleteproperty/${id}`);
      if (response.status === 200) {
        dispatch(DeletePropertySuccess(id));
        enqueueSnackbar("Property deleted successfully", { variant: "success" });
      }
    } catch (error) {
      dispatch(DeletePropertyFailure("Failed to delete property"));
      enqueueSnackbar("Failed to delete property", { variant: "error" });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Listings</h1>
            <Link to="/admin/listing/add-listing">
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                <FaPlus className="mr-2" />
                Add New Listing
              </button>
            </Link>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">ID</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Title</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Address</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">City</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Bedrooms</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Bathrooms</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Price</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Deposit</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">House Type</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Parking</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Status</th>
                    <th className="py-2 px-4 text-left text-gray-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyList && propertyList.length > 0 ? (
                    propertyList.map((listing, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{listing.title}</td>
                        <td className="py-2 px-4">{listing.address}</td>
                        <td className="py-2 px-4">{listing.city}</td>
                        <td className="py-2 px-4">{listing.bedrooms}</td>
                        <td className="py-2 px-4">{listing.bathrooms}</td>
                        <td className="py-2 px-4">{listing.price}</td>
                        <td className="py-2 px-4">{listing.deposit}</td>
                        <td className="py-2 px-4">{listing.houseType}</td>
                        <td className="py-2 px-4">{listing.parking}</td>
                        <td className="py-2 px-4">{listing.status}</td>
                        <td className="py-2 px-4 flex space-x-2">
                          <Link to={`/admin/listing/edit-listing/${listing._id}`}>
                            <button className="text-blue-500 hover:text-blue-700">
                              <FaEdit />
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
                      <td colSpan="12" className="py-2 px-4 text-center">No listings available</td>
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
