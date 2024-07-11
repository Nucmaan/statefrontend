import React from "react";

import herro from "../Images/Herro.jpg";

function PropertyList() {
  return (
    <div className="mx-auto p-3">
      <h1 className="text-center font-bold text-2xl mb-2">Property List</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
        <div className="shadow-md p-3 rounded-md">
          <img src={herro} alt="Herro" className="w-full object-cover " />
          <div className="flex justify-between mt-2">
            <div>
              <h1 className="font-bold text-2xl">$3,280</h1>
            </div>
            <div>
              <button className=" px-6 py-1 font-bold rounded-md border-2 border-blue-600">
                Rent
              </button>
            </div>
          </div>
        
          <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
          <div className="flex justify-between mb-2 ">
            <div>
              <p>3 qol</p>
            </div>

            <div>
              <p>3 qol</p>
            </div>

            <div>
            <button className="bg-blue-600 text-white px-4 py-1 font-bold ">
            View Info
          </button>
            </div>
          </div>
        </div>

        <div className="">
          <img
            src={herro}
            alt="Herro"
            className="w-full object-cover rounded-md"
          />
        </div>

        <div className=" ">
          <img
            src={herro}
            alt="Herro"
            className="w-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
