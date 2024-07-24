import React from "react";
import {  FaRegSmile, FaRegHandshake, FaRegLightbulb } from "react-icons/fa";
import { MdOutlineRoundaboutRight } from "react-icons/md";



function AboutUs() {
  return (
    <div className="mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-center font-bold text-4xl text-black mt-5 mb-8">About Us</h1>
      
      <div className="flex flex-col items-center mb-10">
        <MdOutlineRoundaboutRight className="text-black text-6xl mb-5" />
        <p className="text-lg text-gray-700 px-5 text-justify leading-8 max-w-4xl">
          Welcome to MyHome2U, your ultimate destination for finding your perfect home. Whether you're looking to rent a cozy apartment or buy a luxurious house, we are committed to providing a seamless and personalized experience tailored to your unique needs and preferences. Our goal is to simplify the real estate process, making it easy and enjoyable for you to achieve your homeownership or rental dreams. At MyHome2U, we understand that finding a home is more than just a transaction; it's about finding a place where you can create memories, build your future, and feel truly at home. With our extensive listings, user-friendly interface, and expert support, we are here to guide you every step of the way. Trust us to be your partner in your real estate journey, and let us help you discover the perfect place to call your own.
        </p>
      </div>
      
      <h1 className="text-center font-bold text-4xl text-black mb-8">Our Mission</h1>
      
      <div className="flex flex-col items-center mb-10">
        <FaRegSmile className="text-black text-6xl mb-5" />
        <p className="text-lg text-gray-700 px-5 text-justify leading-8 max-w-4xl">
          Our mission is to simplify the process of renting and buying homes. We strive to offer a comprehensive platform where users can easily navigate through listings, find detailed property information, and make informed decisions. We believe that everyone deserves a place they can call home, and we are dedicated to making that journey as smooth and enjoyable as possible.
        </p>
      </div>
      
      <h1 className="text-center font-bold text-4xl text-black mb-8">Our Story</h1>
      
      <div className="flex flex-col items-center mb-10">
        <FaRegHandshake className="text-black text-6xl mb-5" />
        <p className="text-lg text-gray-700 px-5 text-justify leading-8 max-w-4xl">
          MyHome2U was founded with the vision of revolutionizing the real estate market. Our team, comprised of industry veterans and tech enthusiasts, came together to create a platform that bridges the gap between technology and real estate. We understand the challenges and stresses that come with finding a new home, and we are committed to making it a hassle-free experience for you.
        </p>
      </div>
      
      <h1 className="text-center font-bold text-4xl text-black mb-8">Join Us Today</h1>
      
      <div className="flex flex-col items-center">
        <FaRegLightbulb className="text-black text-6xl mb-5" />
        <p className="text-lg text-gray-700 px-5 text-justify leading-8 max-w-4xl">
          Start your journey with MyHome2U and discover a world of possibilities. Whether you're a first-time renter, a seasoned buyer, or somewhere in between, we have the resources and expertise to help you every step of the way. Thank you for choosing MyHome2U. We look forward to helping you find your perfect home.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
