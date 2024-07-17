import React from "react";
import herro from "../Images/Herro.jpg";
import Blog from "./Blog";
import FeatureIn from "./FeatureIn";

function Herro() {
  return (
    <div>
      <div className="mx-auto p-3 grid grid-cols-1 gap-3 md:grid-cols-2 pt-2 pr-2 ">
        <div className="flex flex-col items-center  md:pt-11 mt-11">
          <p className="mb-2 text-2xl font-bold">Welcome To Our Website</p>
          <h2 className="mb-2 text-2xl font-semibold">
            Find Your Dreame Home Easy And Faster.
          </h2>
          <button className="bg-black text-white px-3 py-1 rounded-md text-2xl hover:bg-black-500 mt-2">
            Find Now
          </button>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-3 mt-10 mb-4">
            <div>
            <h1 className="text-center">2500+</h1>
              <p className="text-center font-bold">Complete Property</p>
            </div>

            <div>
            <h1 className="text-center ">3500+</h1>
              <p className="text-center font-bold"> Property Sales</p>
            </div>

            <div>
            <h1 className="text-center">8500+</h1>
              <p className="text-center font-bold">Happy Clients</p>
            </div>
          </div>
        </div>

        <div>
          <img
            src={herro}
            alt="Herro"
            className="w-full object-cover rounded-md"
          />
        </div>
      </div>

      <Blog />
      <FeatureIn />
    </div>
  );
}

export default Herro;
