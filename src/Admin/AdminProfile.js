import React from 'react';
import AdminSidebar from './AdminSidebar';
import { FaUserEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Admin Profile</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img
                src={user.avatar.url}
                alt="Admin Avatar"
                className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.role}</p>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {user.phone}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {user.createdAt}
                </div>
              </div>
              <Link to={`/admin/profile/edit/${user._id}`}>
             
              <button className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <FaUserEdit className="mr-2" />
                Edit Profile
              </button>

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
