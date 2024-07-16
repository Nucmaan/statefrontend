import React from "react";
import herro from "../Images/hormuud.png";

function FeatureIn() {
  return (
    <div className="mx-auto p-8   my-5">
      <h1 className="text-center font-bold text-2xl mb-8">Featured-in</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="shadow-md rounded-md bg-white p-3 ">
          <img src={herro} alt="Herro" className="w-full object-cover " />

        </div>

        <div className="shadow-md rounded-md bg-white p-3 ">
          <img src={herro} alt="Herro" className="w-full object-cover " />

        </div>

        <div className="shadow-md rounded-md bg-white p-3 ">
          <img src={herro} alt="Herro" className="w-full object-cover " />
        </div>

      </div>
    </div>
  );
}

export default FeatureIn;
