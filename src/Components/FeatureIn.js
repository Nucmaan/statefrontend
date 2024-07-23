import React from "react";
import herro from "../Images/hormuud.png";
import Bille from "../Images/BileMedia.png";
import Astan from "../Images/Astan.png";

function FeatureIn() {
  return (
    <div className="mx-auto shadow-sm px-5 pt-3 pb-10  bg-gray-50">

      <h1 className="text-center font-bold text-2xl mb-3">Featured-in</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">

        <div className="  flex justify-center items-center bg-white rounded-md">
          <img src={herro} alt="Herro" className="w-full object-cover " />
        </div>

        <div className=" flex justify-center items-center bg-white rounded-md">
          <img src={Bille} alt="Herro" className="w-full object-cover " />
        </div>

        <div className=" flex justify-center items-center bg-white py-4 rounded-md">
          <img src={Astan} alt="Herro" className="" />
        </div>

      </div>
    </div>
  );
}

export default FeatureIn;
