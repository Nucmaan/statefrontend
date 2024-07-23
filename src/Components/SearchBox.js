import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBox() {
  return (
    <div className="px-10 py-10 bg-white ">
      <div className="text-center mb-3">
        <label className="font-bold text-2xl">RENT</label>
        <label className="font-bold text-2xl mx-2 text-gray-400">BUY</label>
      </div>
      <div className="flex border-2 border-black rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Type in Area / City Name"
          className="w-full p-2 border-r-2 border-black focus:outline-none focus:border-black"
        />
        <CiSearch className="p-2 text-black  cursor-pointer" size={60} />
      </div>
    </div>
  );
}

export default SearchBox;
