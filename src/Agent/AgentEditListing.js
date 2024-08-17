import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AgentSidebar from './AgentSidebar';
import { enqueueSnackbar } from 'notistack';
import api from "../api";

const AgentEditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);  // Separate preview state

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
        const property = response.data.property;
        setTitle(property.title);
        setDescription(property.description);
        setAddress(property.address);
        setCity(property.city);
        setPrice(property.price);
        setHouseType(property.houseType);
        setBedrooms(property.bedrooms);
        setBathrooms(property.bathrooms);
        setParking(property.parking);
        setDeposit(property.deposit);
        setStatus(property.status);
        setImage(property.image.url);   // Set the image URL
        setImagePreview(property.image.url); // Also set it as the preview
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));  // Set the file preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!title || !description || !address || !city || !price || !houseType || !bedrooms || !bathrooms || !parking || !deposit || !status || !image) {
        enqueueSnackbar("All fields are required", { variant: "error" });
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('price', price);
      formData.append('houseType', houseType);
      formData.append('bedrooms', bedrooms);
      formData.append('bathrooms', bathrooms);
      formData.append('parking', parking);
      formData.append('deposit', deposit);
      formData.append('status', status);

      // Only append the image if it's a file, not a URL
      if (image instanceof File) {
        formData.append('image', image);
      }

      const response = await api.put(`/api/MyHome2U/property/updatesingleproperty/${id}`, formData);

      if (response.status === 200) {
        enqueueSnackbar("Property updated successfully", { variant: "success" });
        navigate('/agent/property-list');
      } else {
        enqueueSnackbar("Failed to update property", { variant: "error" });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Failed to update property", { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex flex-1">
        <AgentSidebar />
        <div className="flex-1 bg-gray-100 p-6">
          <h1 className="text-2xl font-semibold mb-6">Update Listing</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseType">
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
              </select>
            </div>

            {/* Bedrooms */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parking">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deposit">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 h-40 w-40 object-cover rounded"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentEditListing;
