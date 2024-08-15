import React, { useCallback, useEffect, useState } from "react";
import { FaDollarSign, FaPhoneAlt, FaUser, FaMoneyBillWave } from "react-icons/fa";
import AgentSidebar from "./AgentSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import api from "../api";


function UpdateBill() {
  const [amount, setAmount] = useState("");
  const [utilities, setUtilities] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("Pending");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().substr(0, 10));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

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
      setPaymentMethod(payment.paymentMethod || "");
      setStatus(payment.status || "Pending");
      setName(payment.user.name || "");
      setPhone(payment.user.phone || "");
      setPaymentDate(payment.paymentDate ? new Date(payment.paymentDate).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10));
    } catch (error) {
     console.log(error);
    } finally {
      setLoading(false);
    }

  }, [id]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!paymentMethod || !status) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Payment Method and Status are required.',
        confirmButtonColor: '#3085d6',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.put(`/api/MyHome2U/bills/updateBill/${id}`, {
        status,
        paymentDate: new Date(paymentDate).toISOString(),
        paymentMethod,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Payment updated successfully',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate("/agent/payments");
        });
      } else {
        setError("Failed to update payment.");
      }
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 bg-black">
        <AgentSidebar />
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
                      Full Name
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
                      Mobile
                    </label>
                  </div>
                  <input
                    type="text"
                    value={phone}
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

                <div>
                  <div className="flex items-center my-2">
                    <FaDollarSign className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                  </div>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center my-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Date
                    </label>
                  </div>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-center">
                {error}
              </div>
            )}

            <div className="flex w-full">
              <button
                type="submit"
                className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900"} text-white uppercase px-6 py-3 rounded-md shadow-lg hover:${loading ? "bg-gray-400" : "bg-gray-700"} focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-300`}
                disabled={loading}
              >
                {loading ? "Updating Payment..." : "Update Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBill;
