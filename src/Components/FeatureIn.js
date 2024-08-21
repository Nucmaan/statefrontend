import React from "react";
import Hormuud from "../Images/iukl.png";
import Bille from "../Images/hormuud.png";
import Astan from "../Images/Astan.png";

function FeatureIn() {
  return (
    <div className="mx-auto px-5 pt-6 pb-10 bg-white">
      <h1 className="text-center font-bold text-3xl md:text-3xl mb-8 text-black">
        Featured In
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
          <img
            src={Hormuud}
            alt="Hormuud"
            className="object-contain h-24 w-auto md:h-32"
          />
        </div>

        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
          <img
            src={Bille}
            alt="Bille"
            className="object-contain h-24 w-auto md:h-32"
          />
        </div>

        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
          <img
            src={Astan}
            alt="Astan"
            className="object-contain h-24 w-auto md:h-32"
          />
        </div>
      </div>
    </div>
  );
}

export default FeatureIn;
