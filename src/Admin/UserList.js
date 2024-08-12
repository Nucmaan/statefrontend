import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import axios from "axios";
import { useSnackbar } from 'notistack';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/MyHome2U/user/users');
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error(error);
    }
  }

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
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/MyHome2U/user/delete/${id}`);
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        fetchUsers(); // Refetch users after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        enqueueSnackbar('Error deleting user', { variant: 'error' });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User List</h1>
          <Link to="/admin/users/add-new-user">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Add New User
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="role" className="text-gray-700 mr-2">Filter by Role:</label>
            <select
              id="role"
              className="bg-white border border-gray-300 rounded-md shadow-sm p-2 mr-4"
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
            <label htmlFor="search" className="text-gray-700 mr-2">Search by Name:</label>
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
        <div className="overflow-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">ID</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Role</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Mobile</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Status</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">
                    {user.isActive ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <Link to={`/admin/users/edit-user/${user._id}`}>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600"
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
