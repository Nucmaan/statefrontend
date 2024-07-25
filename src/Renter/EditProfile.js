import React from "react";
import SideBar from "./SideBar";
import UserImage from "../Images/profileImage.jpg";
import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr] text-white bg-gray-50">
    <div>
      <SideBar />
    </div>
    <div className="pl-5 text-black">
      <h1 className="text-center py-2 text-2xl md:text-3xl font-medium">
        Update Your Profile Information
      </h1>

    

      <div className="border-t-2 border-black">

      <div className="relative">
      <div className="absolute top-28 right-3">
        <Link to="/Profile">
          <button className="px-6 py-2 z-0 bg-black hover:bg-black text-white rounded-md text-lg md:text-2xl transition duration-300">
        SAVE
          </button>
        </Link>
      </div>
    </div>
      <form>
        <div className="flex justify-center mt-2">
          <img
            src={UserImage}
            alt="UserProfile"
            className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-gray-300 object-cover"
          />
        </div>
        <div>
          <div className="flex flex-col md:flex-row mt-3">
            <div className="md:w-1/3 font-semibold">Name:</div>
            <div className="md:w-2/3">
          <input type="text" className="" placeholder="Enter The Updated Name"></input> 
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-2">
            <div className="md:w-1/3 font-semibold">Mobile:</div>
            <div className="md:w-2/3">
            <input type="number" className="" placeholder="Enter The Updated Mobile"></input>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-2">
            <div className="md:w-1/3 font-semibold">Email:</div>
            <div className="md:w-2/3">
            <input type="email" className="" placeholder="Enter The Updated Email"></input>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-2 mb-2">
            <div className="md:w-1/3 font-semibold">Address:</div>
            <div className="md:w-2/3">
            <input type="text" className="" placeholder="Enter The Updated Address"></input>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default EditProfile;
