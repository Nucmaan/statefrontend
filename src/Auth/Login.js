import { Link } from "react-router-dom";
import React from "react";

function Login() {
  return (
    <div className="flex justify-center items-center pt-6 bg-gray-100">
      <div className="w-full max-w-md mx-5 mb-5">
        <div className="flex flex-col justify-center shadow-lg p-8 rounded-md bg-white">
          <h1 className="font-bold text-3xl text-center text-black">Login</h1>
          <form>
            <div className="mt-6">
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6">
              <input
                type="password"
                placeholder="Password"
                className="border-2 border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <button className="w-full bg-black mt-6 py-3 rounded-md text-white text-2xl hover:bg-gray-800">
                Login
              </button>
            </div>
          </form>

          <p className="text-black mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
