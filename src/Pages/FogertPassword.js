import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import api from "../api"; 


function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const HandleForget = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await api.post('/api/MyHome2U/user/ForgetPassword', { email });
      if (response.status === 200) {
        enqueueSnackbar('We sent a link to your email. Please check your inbox.', { variant: 'success' });
        setEmail('');
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
          <h1 className="font-bold text-3xl text-center text-black pt-3">Forget Password</h1>
          <form onSubmit={HandleForget}>
            <div className="mt-6">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"
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

export default ForgetPassword;
