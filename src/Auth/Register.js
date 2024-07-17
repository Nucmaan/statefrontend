import { Link } from "react-router-dom";
import React from "react";

function Register() {
  return (
    <div className="mx-5">
      <div className="flex flex-col justify-center mx-10 shadow-lg mt-10 px-5 rounded-md mb-10 ">
        <h1 className=" font-bold text-3xl text-center pt-3">Create Account</h1>

        <form>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border-2 border-black p-2 w-full rounded-md"
            />
          </div>

          <div className="mt-6">
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-black p-2 w-full rounded-md"
            />
          </div>

          <div className="mt-6">
            <input
              type="number"
              placeholder="Mobile Number"
              className="border-2 border-black p-2 w-full rounded-md"
            />
          </div>

          <div className="mt-6">
            <input
              type="password"
              placeholder="Enter Password"
              className="border-2 border-black p-2 w-full rounded-md"
            />
          </div>

          <div className="mt-6">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-2 border-black p-2 w-full rounded-md"
            />
          </div>

          <div>
            <button className="w-full bg-black  mt-6 py-3 rounded-md text-white text-2xl">
              Register
            </button>
          </div>

          
            <p className="text-blue-600 mt-3 pb-10">
              have an account? <Link to="/login">Login</Link>
            </p>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
