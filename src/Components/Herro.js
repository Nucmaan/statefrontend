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
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-2xl hover:bg-blue-500">
            Find Now
          </button>
        </div>

        <div>
          <img src={herro} alt="Herro" className="w-full object-cover rounded-md" />
        </div>
      </div>

      <Blog />
      <FeatureIn />
    </div>
  );
}

export default Herro;
