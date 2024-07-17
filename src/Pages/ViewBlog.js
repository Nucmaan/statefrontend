import React from "react";
import { Link } from "react-router-dom";
import herro from "../Images/Herro.jpg";

function ViewBlog() {
  return (
    <div className="mx-auto ">

      <h1 className="text-center font-bold text-2xl mb-5 mt-5">Read Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 mx-auto">
        
      <div className="">
          <img src={herro} alt="Herro" className="w-full object-cover " />
          <div className="p-2">
            <h1 className="font-bold text-2xl mb-2 px-2">
              Uncover 5 Affordable Property for Rent in Gombak
            </h1>
            <p className="mb-2 px-2">7/17/2024</p>

            <p className="px-2 leading-8 text-justify">
              Looking for a property for rent in Gombak? You’re in the good
              spot! This vibrant area has become a popular choice for renters
              seeking affordable yet comfortable living. If you’re on a budget
              but don’t want to sacrifice comfort, Gombak might be the perfect
              spot for you. Let’s explore five fantastic rental options that
              offer great value without compromising on lifestyle.
            </p>
          </div>
        </div>

        <div className="">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-1">

        <Link to="/ViewBlog">
          <div className="shadow-md rounded-md bg-white p-1 hover:bg-black hover:text-white">
            <img src={herro} alt="Herro" className="w-full object-cover " />

            <h1 className=" mb-2 mt-2 px-2  text-2xl">
              7 Cost-Effective Renovation Ideas to Boost Your Rental Income
            </h1>
            <p className="mb-2  px-1 ">7/17/2024</p>
          </div>
        </Link>

        <Link to="/ViewBlog">
        <div className="shadow-md rounded-md bg-white p-1 hover:bg-black hover:text-white">
          <img src={herro} alt="Herro" className="w-full object-cover " />

          <h1 className=" mb-2 mt-2 px-2  text-2xl">
            7 Cost-Effective Renovation Ideas to Boost Your Rental Income
          </h1>
          <p className="mb-2  px-1 ">7/17/2024</p>
        </div>
      </Link>

      <Link to="/ViewBlog">
      <div className="shadow-md rounded-md bg-white p-1 hover:bg-black hover:text-white">
        <img src={herro} alt="Herro" className="w-full object-cover " />

        <h1 className=" mb-2 mt-2 px-2  text-2xl">
          7 Cost-Effective Renovation Ideas to Boost Your Rental Income
        </h1>
        <p className="mb-2  px-1 ">7/17/2024</p>
      </div>
    </Link>



      </div>

      <div className="flex justify-center mt-8">
      <button className="px-6 py-2 font-bold bg-black text-white">
        {" "}
        <Link to="/ViewAll">Load More</Link>{" "}
      </button>
    </div>

        </div>

      </div>
    </div>
  );
}

export default ViewBlog;
