import React from "react";
import herro from "../Images/HerroImage.png";
import { Link } from "react-router-dom";

function Herro() {
  return (
    <div className="pb-5 pt-4 px-5 bg-gray-50 md:pt-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-black font-bold text-3xl lg:text-6xl leading-tight">
            Find your next <span className="text-black">perfect</span>
            <br />
            place with ease
          </h1>
          <p className="my-4 text-gray-600 text-lg sm:text-2xl leading-relaxed">
            MyHome2U is the best place to find your next perfect place to live.
            We have a wide range of properties for you to choose from.
          </p>
          <div>
            <Link to="/Rent">
              <button className="bg-black px-7 py-3 text-2xl text-white rounded-md shadow-md hover:bg-gray-800 transition duration-300">
                Find Now
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={herro}
            alt="Herro"
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Herro;
