import React, { useCallback, useEffect, useState } from "react";
import {
  FaRegNewspaper,
  FaCalendarAlt,
  FaUserCheck,
  FaClock,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import SideBar from "./SideBar";
import api from "../api";
import { Link } from "react-router-dom";
import { RiContractFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      setAllPosts(response.data.posts || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const [userContract, setUserContract] = useState([]);
  const { user } = useSelector((state) => state.user);

  const fetchUserContracts = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/contract/getUserContracts/${user._id}`
      );
      const data = response.data.contracts;
      setUserContract(data);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchUserContracts();
  }, [fetchUserContracts]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [bills, setBills] = useState([]);

  const fetchBills = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/MyHome2U/bills/getUserBills/${user._id}`
      );
      setBills(response.data.bills);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const totalUnpaid = bills
    .filter((bill) => bill.status !== "Paid")
    .reduce((total, bill) => total + bill.total, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <SideBar />
        <div className="flex-1 bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-100 shadow-md rounded-lg p-4 flex items-center">
              <FaUserCheck className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  User Status: Active
                </h2>
                <p className="text-gray-600">Date: {formatDate(currentTime)}</p>
              </div>
            </div>

            <div className="bg-blue-100 shadow-md rounded-lg p-4 flex items-center">
              <FaClock className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Current Time
                </h2>
                <p className="text-gray-600">{formatTime(currentTime)}</p>
              </div>
            </div>


            <div className="bg-purple-100 shadow-md rounded-lg p-4 flex items-center">
              <RiContractFill
                size={50}
                className="text-purple-500 text-3xl mr-4"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Contracts
                </h2>
                <p className="text-gray-600  font-bold text-2xl">
                
                  {userContract.length}{" "}
                </p>
              </div>
            </div>

            <div className="bg-red-100 shadow-md rounded-lg p-4 flex items-center">
              <FaFileInvoiceDollar className="text-red-500 text-3xl mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Payment{" "}
                </h2>
                <p
                  className={`text-gray-600 ${
                    totalUnpaid !== 0
                      ?  "text-red-500 font-bold text-2xl"
                      : "text-black font-bold text-2xl"
                  }`}
                >
                  $ {totalUnpaid.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              News & Announcements
            </h2>
            <div className="space-y-4">
              {allPosts.length === 0 ? (
                <p className="text-gray-600">No posts available.</p>
              ) : (
                allPosts.map((post) => (
                  <Link to={`/ViewBlog/${post._id}`} key={post._id}>
                    <div className="flex justify-between items-center p-3 border-b border-gray-300">
                      <div className="flex items-center">
                        <FaRegNewspaper className="text-gray-500 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1" />
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
