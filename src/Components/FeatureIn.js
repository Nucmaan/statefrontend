import React from "react";
import herro from "../Images/hormuud.png";
import Bille from "../Images/BileMedia.png";
import Astan from "../Images/Astan.png";

function FeatureIn() {
  return (
    <div className="mx-auto p-5   mb-5">

      <h1 className="text-center font-bold text-2xl ">Featured-in</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 ">

        <div className=" p-2 flex justify-center items-center">
          <img src={herro} alt="Herro" className="w-full object-cover " />
        </div>

        <div className="p-2 flex justify-center items-center ">
          <img src={Bille} alt="Herro" className="w-full object-cover " />
        </div>

        <div className="p-2 flex justify-center items-center w-[50%]">
          <img src={Astan} alt="Herro" className="" />
        </div>

      </div>
    </div>
  );
}

export default FeatureIn;
