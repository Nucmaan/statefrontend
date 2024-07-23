import React from "react";
import { Link } from "react-router-dom";
import herro from "../Images/Herro.jpg";
import { MdDirectionsCar } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { PiToiletDuotone } from "react-icons/pi";


function Buy() {
  return (
    <div className="mx-auto p-3">
    <h1 className="text-center font-bold text-2xl mb-1">You Can Buy This Houses</h1>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">

      <div className="shadow-md p-3 rounded-md">
        <img src={herro} alt="Herro" className="w-full object-cover " />
        <div className="flex justify-between mt-2 ">
          <div>
            <h1 className="font-bold text-2xl">$3,280</h1>
          </div>
          <div>
            <button className=" px-6 py-1 font-bold bg-black text-white">
              Rent
            </button>
          </div>
        </div>

        <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
        <p className="mb-2 font-bold italic border-b-2 border-black pb-2">Deposite : $ 1200 </p>
        <div className="flex justify-between mb-2 ">
          <div className="flex  items-center">
            <FaBed className="text-black-600" />{" "}
            <span className="p-2"> 1 Qol</span>
          </div>

          <div className="flex  items-center">
            <PiToiletDuotone className="text-black" />{" "}
            <span className="p-2"> 1 Musqul</span>
          </div>

          <div className="flex  items-center">
            <MdDirectionsCar className="text-black" />{" "}
            <span className="p-2"> 1 Parking</span>
          </div>

          <div className="flex items-center">
            <button className=" px-6 py-1 font-bold  border-2 border-black">
               <Link to="/ViewSingleProperty">View details</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="shadow-md p-3 rounded-md">
      <img src={herro} alt="Herro" className="w-full object-cover " />
      <div className="flex justify-between mt-2 ">
        <div>
          <h1 className="font-bold text-2xl">$3,280</h1>
        </div>
        <div>
          <button className=" px-6 py-1 font-bold bg-black text-white">
            Rent
          </button>
        </div>
      </div>

      <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
      <p className="mb-2 font-bold italic border-b-2 border-black pb-2">Deposite : $ 1200 </p>
      <div className="flex justify-between mb-2 ">
        <div className="flex  items-center">
          <FaBed className="text-black-600" />{" "}
          <span className="p-2"> 1 Qol</span>
        </div>

        <div className="flex  items-center">
          <PiToiletDuotone className="text-black" />{" "}
          <span className="p-2"> 1 Musqul</span>
        </div>

        <div className="flex  items-center">
          <MdDirectionsCar className="text-black" />{" "}
          <span className="p-2"> 1 Parking</span>
        </div>

        <div className="flex items-center">
          <button className=" px-6 py-1 font-bold  border-2 border-black">
             <Link to="/ViewSingleProperty">View details</Link>
          </button>
        </div>
      </div>
    </div>


    <div className="shadow-md p-3 rounded-md">
    <img src={herro} alt="Herro" className="w-full object-cover " />
    <div className="flex justify-between mt-2 ">
      <div>
        <h1 className="font-bold text-2xl">$3,280</h1>
      </div>
      <div>
        <button className=" px-6 py-1 font-bold bg-black text-white">
          Rent
        </button>
      </div>
    </div>

    <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
    <p className="mb-2 font-bold italic border-b-2 border-black pb-2">Deposite : $ 1200 </p>
    <div className="flex justify-between mb-2 ">
      <div className="flex  items-center">
        <FaBed className="text-black-600" />{" "}
        <span className="p-2"> 1 Qol</span>
      </div>

      <div className="flex  items-center">
        <PiToiletDuotone className="text-black" />{" "}
        <span className="p-2"> 1 Musqul</span>
      </div>

      <div className="flex  items-center">
        <MdDirectionsCar className="text-black" />{" "}
        <span className="p-2"> 1 Parking</span>
      </div>

      <div className="flex items-center">
        <button className=" px-6 py-1 font-bold  border-2 border-black">
           <Link to="/ViewSingleProperty">View details</Link>
        </button>
      </div>
    </div>
  </div>


    </div>

  </div>
  )
}

export default Buy