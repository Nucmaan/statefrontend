import React from "react";
import herro from "../Images/Herro.jpg";

function Blog() {
  return (
    <div className="mx-auto p-8 bg-gray-50 my-5">
      <h1 className="text-center font-bold text-2xl mb-3">Blog</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

        <div className="shadow-md rounded-md bg-white p-3 hover:bg-blue-700 hover:text-white">
          <img src={herro} alt="Herro" className="w-full object-cover " />

          <h1 className=" mb-2 mt-2 px-2  text-2xl">
            7 Cost-Effective Renovation Ideas to Boost Your Rental Income
          </h1>
          <p className="mb-2  px-1 ">7/17/2024</p>
        </div>

        <div className="shadow-md rounded-md bg-white p-3 hover:bg-blue-700 hover:text-white">
        <img src={herro} alt="Herro" className="w-full object-cover " />

        <h1 className=" mb-2 mt-2 px-2  text-2xl">
          7 Cost-Effective Renovation Ideas to Boost Your Rental Income
        </h1>
        <p className="mb-2  px-1 ">7/17/2024</p>
      </div>


      <div className="shadow-md rounded-md bg-white p-3 hover:bg-blue-700 hover:text-white">
      <img src={herro} alt="Herro" className="w-full object-cover " />

      <h1 className=" mb-2 mt-2 px-2  text-2xl">
        7 Cost-Effective Renovation Ideas to Boost Your Rental Income
      </h1>
      <p className="mb-2  px-1 ">7/17/2024</p>
    </div>


    <div className="shadow-md rounded-md bg-white p-3 hover:bg-blue-700 hover:text-white">
    <img src={herro} alt="Herro" className="w-full object-cover " />

    <h1 className=" mb-2 mt-2 px-2  text-2xl">
      7 Cost-Effective Renovation Ideas to Boost Your Rental Income
    </h1>
    <p className="mb-2  px-1 ">7/17/2024</p>
  </div>



      </div>
    </div>
  );
}

export default Blog;
