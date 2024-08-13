import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Adjust the path as needed
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../api";


function EditUser() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("user");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); 
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        enqueueSnackbar("File is too large. Please select a file smaller than 10MB.", { variant: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Store the image data URL
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/MyHome2U/user/getSingleUser/${id}`);
        if (response.status === 200) {
          const userData = response.data.user;
          setName(userData.name);
          setEmail(userData.email);
          setPhone(userData.phone);
          setAvatar(userData.avatar ? userData.avatar.url : null); // Adjusted to handle avatar correctly
          setRole(userData.role);
          setIsActive(userData.isActive);
        } else {
          enqueueSnackbar(response.data.message, { variant: "error" });
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Failed to fetch user data", { variant: "error" });
        }
      }
    };

    fetchUser();
  }, [id, enqueueSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(`/api/MyHome2U/user/updateSingleUser/${id}`, {
        name,
        email,
        password,
        phone,
        avatar,
        role,
        isActive
      });
      if (response.status === 200) {
        enqueueSnackbar("Update Successful", { variant: "success" });
        navigate("/admin/users");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Failed to update user", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar /> 
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Update User</h1>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-gray-700">Profile Image</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {avatar && <img src={avatar} alt="Avatar Preview" className="mt-2 h-20 w-20 rounded-full  object-cover" />}
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="isActive" className="block text-gray-700">Active</label>
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
