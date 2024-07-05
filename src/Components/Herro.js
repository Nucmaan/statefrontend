import React from "react";

import herro from "../Images/Herro.jpg";

function Herro() {
  return (
    <div className="mx-auto grid grid-cols-1 gap-3 md:grid-cols-2 p-3">
      <div className="flex flex-col items-center pt-11 mt-11">
        <p className="mb-2 text-2xl font-bold">Welcome To Our Website </p>
        <h2 className="mb-2 text-2xl font-semibold">
          Find Your Dreame Home Easy And Faster.
        </h2>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-2xl">
          Find Now{" "}
        </button>
      </div>

      <div>
        <img src={herro} alt="Herro" className="w-full object-cover" />
      </div>
    </div>
  );
}

export default Herro;
