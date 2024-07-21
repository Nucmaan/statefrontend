import React from 'react'
import SideBar from './SideBar'

function Profile() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr]  text-black  my-15 ">
    <div className="border-r-2 border-white  mt-9">
      <SideBar />
    </div>

    <div className="pl-5 pt-14  overflow-auto">
    <p className="text-lg">
        Welcome to your Profile. Here you can manage All your Profile, view your
        activities or property lis update, and more.
      </p>

    </div>
  </div>
  )
}

export default Profile