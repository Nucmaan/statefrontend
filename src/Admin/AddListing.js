import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { 
  AddPropertyStart, 
  AddPropertySuccess, 
  AddPropertyFailure 
} from "../Redux/PropertyList/PropertySlice.js";

const AddListing = () => {
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
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

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
        '/api/MyHome2U/property/addproperty',
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
          status
        }
      );

      if (response.status === 201) {
        dispatch(AddPropertySuccess(response.data.property));
        enqueueSnackbar("Property added successfully", { variant: "success" });
        // Reset form state
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
        navigate('/admin/listing/add-listing');
      } else {
        dispatch(AddPropertyFailure("Failed to add property"));
        enqueueSnackbar("Failed to add property", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      dispatch(AddPropertyFailure("Failed to add property"));
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Failed to add property", { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6">Add New Listing</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {/* Title */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* House Type */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="houseType"
              >
                House Type
              </label>
              <select
                id="houseType"
                name="houseType"
                value={houseType}
                onChange={(e) => setHouseType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bedrooms"
              >
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Bathrooms */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bathrooms"
              >
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Parking */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="parking"
              >
                Parking
              </label>
              <input
                type="number"
                id="parking"
                name="parking"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Deposit */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deposit"
              >
                Deposit
              </label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-4 w-48 h-48 object-cover rounded-md"
                />
              )}
            </div>

            <div className="">
              <button
                type="submit"
                className={`${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed w-full"
                    : "bg-blue-500 hover:bg-blue-700 w-full"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
