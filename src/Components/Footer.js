import React from "react";

function Footer() {
  return (
    <div className="mx-auto px-4 bg-blue-600  text-white   bottom-0 left-0 right-0  w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        <div>
          <h1 className="mb-2 pt-2">MyHome2U</h1>

          <p className="mb-2">Km4,Talex-Street-2671- Mogadisho-Somalia</p>
          <p className="mb-2">Email : Info@MyHome2U.com</p>
          <p className="mb-2">Mobile Number : 01113323658</p>
        </div>

        <div>
          <h1 className="mb-2 pt-2">Social Media </h1>
          <p className="mb-2">Facebook : www.facebook.com/MyHome2U</p>
          <p className="mb-2">Tiktok : www.tiktok.com/MyHome2U</p>
          <p className="mb-2">Instagram : www.instagram.com/MyHome2U</p>
          <p className="mb-2">Youtube : www.youtube.com/MyHome2U</p>
        </div>

        <div className="">
          <h1 className="mb-2 font-bold pt-2">Links</h1>
          <p className="mb-2 ">Home</p>
          <p className="mb-2 ">PropertyList</p>
          <p className="mb-2 ">Contact Us</p>
          <p className="mb-2 ">About Us</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
