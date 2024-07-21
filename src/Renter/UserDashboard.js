import React from "react";
import SideBar from "./SideBar";

function UserDashboard() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr]  text-white  my-15 ">
      <div className="border-r-2 border-white  mt-9">
        <SideBar />
      </div>

      <div className="pl-5 pt-14 ">
        <p className="text-lg">
          Welcome to your dashboard. Here you can manage your profile, view your
          activities, and more.
        </p>
      </div>
    </div>
  );
}

export default UserDashboard;
