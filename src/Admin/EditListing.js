// src/Admin/EditListing.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { 
  UpdatePropertyStart,
  UpdatePropertySuccess,
  UpdatePropertyFailure
} from '../Redux/PropertyList/PropertySlice.js';

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    price: '',
    houseType: 'Rent',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    deposit: '',
    status: 'Available',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/MyHome2U/property/getsingleproperty/${id}`);
        const property = response.data.property;
        setFormData({
          title: property.title,
          description: property.description,
          address: property.address,
          city: property.city,
          price: property.price,
          houseType: property.houseType,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          parking: property.parking,
          deposit: property.deposit,
          status: property.status,
          image: property.image.url
        });
      } catch (error) {
        console.error('Failed to fetch property', error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(prevData => ({ ...prevData, image: reader.result }));
      };
    } else {
      setFormData(prevData => ({ ...prevData, image: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(UpdatePropertyStart());
    try {
      const response = await axios.put(
        `/api/MyHome2U/property/updatesingleproperty/${id}`,
        {
          ...formData,
          owner: user._id
        }
      );

      if (response.status === 200) {
        dispatch(UpdatePropertySuccess(response.data.property));
        enqueueSnackbar("Property updated successfully", { variant: "success" });
        navigate('/admin/listing');
      } else {
        dispatch(UpdatePropertyFailure("Failed to update property"));
        enqueueSnackbar("Failed to update property", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      dispatch(UpdatePropertyFailure("Failed to update property"));
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
        <AdminSidebar />
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
                value={formData.title}
                onChange={handleChange}
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
                value={formData.description}
                onChange={handleChange}
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
                value={formData.address}
                onChange={handleChange}
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
                value={formData.city}
                onChange={handleChange}
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
                value={formData.price}
                onChange={handleChange}
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
                value={formData.houseType}
                onChange={handleChange}
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
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
                value={formData.bathrooms}
                onChange={handleChange}
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
                value={formData.parking}
                onChange={handleChange}
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
                value={formData.deposit}
                onChange={handleChange}
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
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {formData.image && (
                        <img src={formData.image} alt="Property Preview" className="mt-2 w-full h-64 object-cover" />
                      )}
                    </div>
        
                    {/* Submit Button */}
                    <div className="mb-4">
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white font-bold rounded-md ${
                          isLoading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Updating...' : 'Update Property'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        };
         export default EditListing;
        
