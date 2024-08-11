// src/routes/index.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AboutUs from '../Pages/AboutUs';
import ContactUs from '../Pages/ContactUs';
import PropertyList from '../Pages/PropertyList';
import ViewAll from '../Pages/ViewAll';
import ViewBlog from '../Pages/ViewBlog';
import ViewProperty from '../Pages/ViewProperty';
import ForgetPassword from '../Pages/FogertPassword';
import ResetPassword from '../Pages/ResetPassword';
import UserDashboard from '../Renter/UserDashboard';
import Booking from '../Renter/Booking';
import Profile from '../Renter/Profile';
import Bills from '../Renter/Bills';
import Rent from '../Pages/Rent';
import Buy from '../Pages/Buy';
import SinglePage from '../Pages/SinglePage';
import EditProfile from '../Renter/EditProfile';
import Payment from '../Renter/Payment';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminProfile from '../Admin/AdminProfile';
import EditAdminProfile from '../Admin/EditAdminProfile';
import UserList from '../Admin/UserList';
import AgentDashboard from '../Agent/AgentDashboard';
import AgentProfile from '../Agent/AgentProfile';
import PrivateRoute from '../Components/PrivateRoute';
import AdminSidebar from '../Admin/AdminSidebar';
import AgentSidebar from '../Agent/AgentSidebar';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<SinglePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/properties" element={<PropertyList />} />
    <Route path="/rent" element={<Rent />} />
    <Route path="/buy" element={<Buy />} />
    <Route path="/view-all" element={<ViewAll />} />
    <Route path="/view-blog" element={<ViewBlog />} />
    <Route path="/property/:id" element={<ViewProperty />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />

    {/* Protected Routes */}
    <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/booking" element={<Booking />} />
    </Route>

    {/* Admin Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/profile" element={<AdminProfile />} />
    <Route path="/admin/profile/edit" element={<EditAdminProfile />} />
    <Route path="/admin/users" element={<UserList />} />

    {/* Agent Routes */}
    <Route path="/agent/dashboard" element={<AgentDashboard />} />
    <Route path="/agent/profile" element={<AgentProfile />} />

    {/* Sidebars */}
    <Route path="/admin/sidebar" element={<AdminSidebar />} />
    <Route path="/agent/sidebar" element={<AgentSidebar />} />
  </Routes>
);

export default AppRoutes;
