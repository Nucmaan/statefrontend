import React from 'react'
import SideBar from './SideBar'

function Welcome() {
  return (
    
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr]  text-black  bg-white  ">

    <div className=" ">
      <SideBar />
    </div>

    <div className="pl-5   ">
      <p className="text-lg">
        Welcome to your dashboard. Here you can manage your profile, view your
        activities, and more.
      </p>
    </div>

  </div>

  )
}

export default Welcome

