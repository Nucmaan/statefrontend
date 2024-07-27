import { Link } from "react-router-dom";
import React from "react";
import herro from "../Images/Herro.jpg";

function Blog() {
  return (
    <div className="mx-auto py-7  px-10  ">
      <h1 className="text-center font-bold text-2xl mb-5">Blog</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Link to="/ViewBlog">
          <div className="shadow-md rounded-md bg-white   ">
            <img src={herro} alt="Herro" className="w-full object-cover " />

            <h1 className=" mb-2 mt-2 px-2  text-2xl">
              7 Cost-Effective Renovation Ideas to Boost Your Rental Income
            </h1>
            <p className="mb-2  px-1 ">7/17/2024</p>
          </div>
        </Link>

        <Link to="/ViewBlog">
          <div className="shadow-md rounded-md bg-white  ">
            <img src={herro} alt="Herro" className="w-full object-cover " />

            <h1 className=" mb-2 mt-2 px-2  text-2xl">
              7 Cost-Effective Renovation Ideas to Boost Your Rental Income
            </h1>
            <p className="mb-2  px-1 ">7/17/2024</p>
          </div>
        </Link>

        <Link to="/ViewBlog">
          <div className="shadow-md rounded-md bg-white ">
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
  );
}

export default Blog;
