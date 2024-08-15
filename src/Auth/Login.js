import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInStart, SignInSuccess, SignInFailure } from '../Redux/User/UserSlice';
import { useSnackbar } from 'notistack';
import api from "../api"; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(SignInStart());

    try {
      const response = await api.post('/api/MyHome2U/user/login', { email, password });
      if (response.status === 200) {
        dispatch(SignInSuccess(response.data.user));
        enqueueSnackbar('Login Successful', { variant: 'success' }); // Notistack success message
        const userRole = response.data.user.role;
        if (userRole === 'user') {
          navigate('/user/Dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'agent') {
          navigate('/agent/Dashboard');
        } else {
          dispatch(SignInFailure(response.data.message));
          enqueueSnackbar(response.data.message, { variant: 'error' }); // Notistack error message
        }
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Failed to login';
      dispatch(SignInFailure(errorMessage));
      enqueueSnackbar(errorMessage, { variant: 'error' }); // Notistack error message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md text-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-red-600 font-medium text-center mb-2">
              <Link to="/ForgetPassword" className="hover:underline">Forgot Password?</Link>
            </p>
            <p className="text-gray-700 text-center">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
