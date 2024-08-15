import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from "react-router-dom";
import api from "../api"; 

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const HandlResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await api.post(`/api/MyHome2U/user/changePassword/${token}`, { newPassword: password });
      if (response.status === 200) {
        enqueueSnackbar('Password changed successfully.', { variant: 'success' });
        navigate('/login'); // Redirect to login page after password reset success.
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Unable to reset your password now. Please try again later.', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5">
      <div className="w-full max-w-md mx-5 mb-5">
        <div className="flex flex-col justify-center shadow-lg p-8 rounded-md bg-white">
          <h1 className="font-bold text-3xl text-center text-black pt-3">Create New Password</h1>
          <form onSubmit={HandlResetPassword}>
            <div className="mt-6">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your New Password"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-black mt-6 py-3 rounded-md text-white text-2xl hover:bg-gray-800">
                {loading ? 'Processing...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
