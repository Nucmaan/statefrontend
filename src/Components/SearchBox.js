import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBox() {
  return (
    <div className="px-10 py-10 bg-white">
      <div className="flex border-2 border-black rounded-md overflow-hidden">
        <select className="p-2 border-r-2 border-black focus:outline-none focus:border-black bg-white text-black">
          <option className="bg-white text-black font-bold ">RENT</option>
          <option className="bg-white text-black font-bold">BUY</option>
        </select>
        <input
          type="text"
          placeholder="Type in Area / Property Name"
          className="w-full p-2 focus:outline-none"
        />
        <CiSearch className="p-2 text-black cursor-pointer" size={60} />
      </div>
    </div>
  );
}

export default SearchBox;
