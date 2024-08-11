import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPropertyStart,
  AddPropertySuccess,
  AddPropertyFailure,
} from "../Redux/PropertyList/PropertySlice.js";

const AgentAddListing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State variables for each field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [houseType, setHouseType] = useState("Rent");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parking, setParking] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("Available");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(AddPropertyStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/MyHome2U/property/addproperty",
        {
          title,
          description,
          address,
          city,
          bedrooms,
          bathrooms,
          price,
          deposit,
          houseType,
          parking,
          image,
          owner: user._id,
          status,
        }
      );

      if (response.status === 201) {
        dispatch(AddPropertySuccess(response.data.property));
        enqueueSnackbar("Property added successfully", { variant: "success" });
        resetForm();
        navigate("/agent/property-list");
      } else {
        handleFailure("Failed to add property");
      }
    } catch (error) {
      handleFailure(
        error.response?.data?.message || "Failed to add property"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailure = (message) => {
    dispatch(AddPropertyFailure(message));
    enqueueSnackbar(message, { variant: "error" });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAddress("");
    setCity("");
    setPrice("");
    setHouseType("Rent");
    setBedrooms("");
    setBathrooms("");
    setParking("");
    setDeposit("");
    setStatus("Available");
    setImage("");
  };

  return (
    <div className="flex min-h-screen bg-black ">
      <AgentSidebar />
      <div className="flex-1 p-3 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 my-2 text-center">Add New Listing</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Deposit */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="deposit">
                Deposit
              </label>
              <input
                type="number"
                id="deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* House Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="houseType"
              >
                House Type
              </label>
              <select
                id="houseType"
                value={houseType}
                onChange={(e) => setHouseType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="bedrooms">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="bathrooms">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Parking */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="parking">
              Parking
            </label>
            <input
              type="number"
              id="parking"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentAddListing;
