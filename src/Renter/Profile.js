import React from "react";
import SideBar from "./SideBar";
import UserImage from "../Images/profileImage.jpg";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr] text-white bg-gray-50 min-h-screen">
      <div className="bg-black">
        <SideBar />
      </div>
      <div className="pl-5 text-black">
        <h1 className="text-center py-2 text-2xl md:text-3xl font-medium">
          Profile Information
        </h1>
        <div className="relative">
          <div className="absolute top-14 right-3 z-10">
            <Link to="/EditProfile">
              <button className="px-6 py-2 z-0 bg-green-700 hover:bg-green-800 text-white rounded-md text-lg md:text-2xl transition duration-300">
            EDIT
              </button>
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-black">
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
              <div className="md:w-2/3">John Doe</div>
            </div>
            <div className="flex flex-col md:flex-row mt-2">
              <div className="md:w-1/3 font-semibold">Mobile:</div>
              <div className="md:w-2/3">+601113323658</div>
            </div>
            <div className="flex flex-col md:flex-row mt-2">
              <div className="md:w-1/3 font-semibold">Email:</div>
              <div className="md:w-2/3">lucmaan1999@gmail.com</div>
            </div>
            <div className="flex flex-col md:flex-row mt-2">
              <div className="md:w-1/3 font-semibold">Address:</div>
              <div className="md:w-2/3">Hodan Taleex Mogadisho Somalia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
