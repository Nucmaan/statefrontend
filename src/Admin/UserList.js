import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useSnackbar } from 'notistack';
import api from "../api";
import Swal from 'sweetalert2';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/MyHome2U/user/users');
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message || 'Please try again later.'
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [selectedRole, searchQuery, users]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await api.delete(`/api/MyHome2U/user/delete/${id}`);
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        fetchUsers();
      }
    } catch (error) {
      enqueueSnackbar('Error deleting user', { variant: 'error' });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User List</h1>
          <Link to="/admin/users/add-new-user">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors">
              Add New User
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <label htmlFor="role" className="text-gray-700 font-medium mr-2">Filter by Role:</label>
            <select
              id="role"
              className="bg-white border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="search" className="text-gray-700 font-medium mr-2">Search by Name:</label>
            <input
              id="search"
              type="text"
              className="bg-white border border-gray-300 rounded-md shadow-sm p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Email</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Role</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Mobile</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">
                    {user.isActive ? (
                      <span className="text-green-500 font-medium">Active</span>
                    ) : (
                      <span className="text-red-500 font-medium">Inactive</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <Link to={`/admin/users/edit-user/${user._id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-yellow-600 transition-colors">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserList;
