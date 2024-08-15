import React, { useCallback, useEffect, useState } from "react";
import { FaDollarSign, FaPhoneAlt, FaUser, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import api from "../api"; 
import { useSnackbar } from "notistack";

function PayBillNow() {
  const [amount, setAmount] = useState("");
  const [utilities, setUtilities] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPayment = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/MyHome2U/bills/GetSingleBill/${id}`);
      const payment = response.data.bill;
      setAmount(payment.amount);
      setUtilities(payment.utilities);
      setTotal(payment.total);
      setName(payment.owner.name);
      setPhone(payment.owner.phone);
      setUserMobile(payment.user.phone);
      setUserName(payment.user.name);
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "server  error";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [id,enqueueSnackbar]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.put(`/api/MyHome2U/bills/updateUserBill/${id}`, {
        paymentMethod,
      });
      if (response.status === 200) {
        alert("Payment updated successfully");
        navigate("/user/Bills");
      } else {
        setError("Failed to update payment.");
      }
    } catch (error) {
      setError("An error occurred while updating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <SideBar />
        <div className="flex-1 bg-white p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Update Payment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center my-2">
                    <FaUser className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Owner Name
                    </label>
                  </div>
                  <input
                    type="text"
                    value={name}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center my-2">
                    <FaPhoneAlt className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Owner Mobile
                    </label>
                  </div>
                  <input
                    type="number"
                    value={phone}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaPhoneAlt className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                  </div>
                  <input
                    type="text"
                    value={userName}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaPhoneAlt className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Your Mobile <span className="italic text-red-600"> ( Use This Number To Send the Money )</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    value={userMobile}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaDollarSign className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Rent Amount
                    </label>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaMoneyBillWave className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Utilities
                    </label>
                  </div>
                  <input
                    type="number"
                    value={utilities}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaMoneyBillWave className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Total
                    </label>
                  </div>
                  <input
                    type="number"
                    value={total}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <FaDollarSign className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                  </div>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>
            </div>
            {error && <div className="text-red-600 text-center">{error}</div>}
            <div className="flex w-full">
              <button
                type="submit"
                className={`w-full ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900"
                } text-white uppercase px-6 py-3 rounded-md shadow-lg hover:${
                  loading ? "bg-gray-400" : "bg-gray-700"
                } focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300`}
                disabled={loading}
              >
                {loading ? "Processing Payment..." : "Pay now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayBillNow;
