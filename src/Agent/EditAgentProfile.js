import React, { useEffect, useState } from 'react';
import AgentSidebar from './AgentSidebar'; // Adjust the path as needed
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { userUpdateStarted, userUpdateSuccess, userUpdateFailure } from "../Redux/User/UserSlice";
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import api from "../api";

const EditAgentProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("user");
  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

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

    try {
      dispatch(userUpdateStarted());
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
        dispatch(userUpdateSuccess(response.data.user));
        enqueueSnackbar("Update Successful", { variant: "success" });
        navigate("/agent/profile");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      dispatch(userUpdateFailure("User update failed"));
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(`${error}`, { variant: "error" }); // Fixed unterminated string constant
      }
    } 
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AgentSidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Edit Agent Profile</h1>
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
              {avatar && <img src={avatar} alt="Avatar Preview" className="mt-2 h-20 w-20 rounded-full object-cover" />}
            </div>
  
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAgentProfile;


