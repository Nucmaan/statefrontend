import { Link } from "react-router-dom";
import React from "react";

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5">
      <div className="w-full max-w-md mx-5 mb-5">
        <div className="flex flex-col justify-center shadow-lg p-8 rounded-md bg-white">
          <h1 className="font-bold text-3xl text-center text-black pt-3">Create Account</h1>

          <form>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Full Name"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6">
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6">
              <input
                type="number"
                placeholder="Mobile Number"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6">
              <input
                type="password"
                placeholder="Enter Password"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6">
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <button className="w-full bg-black mt-6 py-3 rounded-md text-white text-2xl hover:bg-gray-800">
                Register
              </button>
            </div>
          </form>

          <p className="text-black mt-3 text-center">
            Have an account?{" "}
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
