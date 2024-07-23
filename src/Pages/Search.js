import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function Search() {
  return (
    <div className="py-10 bg-gray-50  ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 ">
        <div className="flex flex-col p-4 ">
          <div>
            <h1 className="mb-2 font-bold text-2xl">Landlord</h1>
          </div>
          <div>
            <p className="mb-2 font-medium">
              Rent out with up to 20x Better Protection
            </p>
          </div>
          <div className="flex justify-between items-center bg-black text-white p-3">
            <h1 className=" ">POST PROPERTY FREE+</h1>
            <HiArrowLongRight className="" size={40} />
          </div>
        </div>

        <div className="flex flex-col p-4  ">
          <div>
            <h1 className="mb-2 font-bold text-2xl">Tenant</h1>
          </div>
          <div>
            <p className="mb-2 font-medium">Rent a Home with Zero Deposit</p>
          </div>
          <div className="flex justify-between items-center bg-black text-white p-3">
            <h1 className=" ">Search Property Now</h1>
            <HiArrowLongRight className="" size={40} />
          </div>
        </div>

        <div className="flex flex-col p-4">
          <div>
            <h1 className="mb-2 font-bold text-2xl">New Launches</h1>
          </div>
          <div>
            <p className="mb-2 font-medium">Explore Upcoming Projects</p>
          </div>
          <div className="flex justify-between items-center bg-black text-white p-3">
            <h1 className=" ">Buy New Property Now</h1>
            <HiArrowLongRight className="" size={40} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Search;
