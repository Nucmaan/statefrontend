import React from "react";
import SideBar from "./SideBar";

function UserDashboard() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr]  text-white  min-h-screen">

      <div className="bg-black">
        <SideBar />
      </div>

      <div className="pl-5  bg-gray-50 text-black ">
        <p className="text-lg">
          Welcome to your dashboard.
        </p>
      </div>

    </div>
  );
}

export default UserDashboard;
