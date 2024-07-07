import { Link } from "react-router-dom";
import React from "react";

function Login() {
  return (
    <div className="mx-5">

    <div className="flex flex-col justify-center mx-10 shadow-lg mt-10 p-5 rounded-md">
    
    <h1 className=" font-bold text-3xl text-center">Login</h1>

      <form>
        <div className="mt-6">
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-blue-600 p-2 w-full rounded-md"
          />
        </div>

        <div className="mt-6">
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-blue-600 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <button className="w-full bg-blue-600  mt-6 py-3 rounded-md text-white text-2xl">
            Login
          </button>
        </div>
      </form>
      
        <p className="text-red-600 mt-3">Don't have an account? <Link to="/register">Register</Link></p>
       
    
    </div>

    </div>
  );
}

export default Login;
