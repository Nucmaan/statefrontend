import React from "react";
import herro from "../Images/HerroImage.png";
import { Link } from "react-router-dom";

function Herro() {
  return (
    <div className="py-8 px-5 bg-gray-50">
      <div className="mx-auto  grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col px-5 mt-5">
          <div>
            <h1 className="text-black font-bold text-3xl lg:text-6xl">
              Find your next <span className="text-black">perfect</span>
              <br />
              place with ease
            </h1>
          </div>

          <div className="my-4 text-gray-400 text-xs sm:text-2xl leading-6 md:leading-8 md:text-2xl md:text-justify">
            MyHome2U is the best place to find your next perfect place to live.
            We have a wide range of properties for you to choose from.
          </div>
          <div className="mb-4 md:">
            <button className="bg-black px-7 py-2 text-2xl text-white"><Link to="/Rent">Find Now</Link> </button>
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
    </div>
  );
}

export default Herro;
