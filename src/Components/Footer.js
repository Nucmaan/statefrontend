import React from "react";
import logo from "../Images/MyHomeLogo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";



function Footer() {
  return (
    <div className="mx-auto bg-black  text-white mt-1 static left-0 bottom-0 w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 p-5">

        <div className="px-5">
          <p className="uppercase mb-3">MyHome2U</p>

          <div className="flex justify-between">
          <p className="mb-2 uppercase">123 Main St, Mogadisho, Banadir,</p>
          <p className="mb-2 uppercase">+601113323658</p>
          </div> 

          <div className="flex justify-between">
          <p className="mb-2 uppercase">HOME</p>
          <p className="mb-2 uppercase">PROPERTY</p>
          </div>

          <div className="flex justify-between border-b-2 border-white-600 mb-2">
          <p className="mb-2 uppercase">contact us</p>
          <p className="mb-2 uppercase">Aboutus</p>
          </div>

          <div className="flex justify-between">
          <p className="mb-2 uppercase">login</p>
          <p className="mb-2 uppercase">register</p>
          </div>  
         
        </div>

        <div className="border-l-2 border-white-600 ">
          <img src={logo} alt="MyHome2U Logo" className="h-12 w-auto flex" />
          <p className="ml-3 mt-3 uppercase font-bold mb-3">
          Find your Dream Home Fast And Easy.
          </p>

          <button className="bg-white shadow-md text-black px-5 py-2 ml-3 font-bold ">Find Now</button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-black text-white px-5 py-2">

        <div className="">
        <p className="font-bold text-2xl ">&#xa9; MyHome2U</p>
        </div>

        <div className="flex items-center">
        <p className="uppercase ">Social Media Links</p>
        <FaFacebook className="mx-3" size={30}/> 
        <FaInstagram className="mx-3" size={30}/>
        <IoLogoYoutube className="mx-3" size={30}/>
        <AiFillTikTok className="mx-3" size={30}/>
        </div>

      </div>

    </div>
  );
}

export default Footer;
