import React from "react";

function ContactUs() {
  return (
    <div className="mx-auto">

    <h1 className="text-center font-bold mt-5 mb-4 text-2xl">Contact Us</h1>

    <div className="grid grid-cols-1  md:grid-cols-2  p-5">
    
      <div className="mb-3">
      <h1 className="mb-2 pl-5 font-bold text-2xl">Welcome MyHome2U If you Need Help Please Contact Us</h1>
        <h2 className="text-xl font-bold mb-2 pl-5">Opening Hours</h2>
        <p className="text-2xl mb-2 pl-5">Monday - Friday: 9 AM - 5 PM</p>
        <p className="text-2xl mb-2 pl-5">Phone: +601113323658</p>
        <p className="text-2xl mb-2 pl-5">Email: info@MyHome2U.com</p>
        <p className="text-2xl mb-2 pl-5">Address: 123 Main St, Mogadisho, Banadir, 252</p>
      </div>

      <div className="flex flex-col items-center gap-y-5 pb-5 mb-5">
        <input
          type="text"
          placeholder="Your Name"
          className="border-2 p-2 w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border-2 p-2 w-full"
        />
        <textarea
          placeholder="Your Message"
          className="border-2 p-2 w-full h-32"
        />
        <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Send
        </button>
      </div>

      </div>

    </div>
  );
}

export default ContactUs;
