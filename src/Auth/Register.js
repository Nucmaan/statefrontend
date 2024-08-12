import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import Notistack hook
import api from "../api"; 


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Use Notistack hook
  const navigate = useNavigate();
  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        enqueueSnackbar('File is too large. Please select a file smaller than 10MB.', { variant: 'error' }); // Notistack error message
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match.', { variant: 'error' }); // Notistack error message
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/MyHome2U/user/register', {
        name,
        email,
        password,
        phone,
        avatar,
      });
      if (response.status === 201) {
        enqueueSnackbar('Registration Successful. You have successfully registered.', { variant: 'success' }); // Notistack success message
        navigate('/login');
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' }); // Notistack error message
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Failed to register.';
      enqueueSnackbar(errorMessage, { variant: 'error' }); // Notistack error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5">
      <div className="w-full max-w-4xl mx-5 mb-5">
        <div className="flex flex-col justify-center shadow-lg p-8 rounded-md bg-white">
          <h1 className="font-bold text-3xl text-center text-black pt-3">Create Account</h1>

          <form onSubmit={handleRegistration}>
            <div className="flex justify-center mt-6">
              <label htmlFor="profileImage" className="relative cursor-pointer">
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">Profile Image</div>
                  )}
                </div>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-500' : 'bg-black'} mt-6 py-3 rounded-md text-white text-2xl hover:${loading ? 'bg-gray-500' : 'bg-gray-800'}`}
              >
                {loading ? 'Processing...' : 'Register'}
              </button>
            </div>
          </form>

          <p className="text-black mt-3 text-center">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
