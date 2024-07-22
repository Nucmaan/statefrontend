import React from "react";
import herro from "../Images/HerroImage.png";
import Blog from "./Blog";
import FeatureIn from "./FeatureIn";
import { MdHomeWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBuildingShield } from "react-icons/fa6";
import WhyUs from "../Pages/WhyUs";
import Search from "../Pages/Search";

function Herro() {
  return (
    <div className="">
      <div className="mx-auto p-3 grid grid-cols-1 md:grid-cols-2 pt-2 pr-2 mb-14 ">

        <div className="flex flex-col items-center md:pt-3">
          <p className="mb-3 text-2xl font-bold">Welcome To Our Website</p>
          <h2 className="mb-2 text-2xl font-semibold">
            Find Your Dream Home Easy And Faster.
          </h2>
          <button className="bg-black text-white px-3 py-1 rounded-md text-2xl hover:bg-black-500 mt-4">
            Find Now
          </button>

          <div className="grid grid-cols-3 gap-5 md:grid-cols-3 mt-8 mb-4">
            <div className="flex flex-col justify-center items-center">
              <FaBuildingShield size={80} />
              <h1 className="text-3xl mt-2 mb-1">8500+</h1>
              <p className="font-bold">Complete Property</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <MdHomeWork size={80} />
              <h1 className="text-3xl mt-2 mb-1">8500+</h1>
              <p className="font-bold">Property Sales</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <FaUsers size={80} />
              <h1 className="text-3xl mt-2 mb-1">2500+</h1>{" "}
              {/* Corrected this line */}
              <p className="font-bold">Happy Clients</p>
            </div>
          </div>
        </div>

        <div className="">
          <img
            src={herro}
            alt="Herro"
            className="w-full max-h-96 object-cover rounded-md"
          />
        </div>

      </div>

      <WhyUs />
      <Search />
      <FeatureIn />
      <Blog />
    </div>
  );
}

export default Herro;
