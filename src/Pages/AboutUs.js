import React from "react";
import aboutImage1 from "../Images/AboutUs1.jpg";
import aboutImage2 from "../Images/OurMision.jpg";
import aboutImage3 from "../Images/OurHistory.jpg";
import aboutImage4 from "../Images/joinUs.jpg";

function AboutUs() {
  return (
    <div className="mx-auto p-8 min-h-screen">
      <h1 className="text-center font-bold text-4xl text-black mb-8">About Us</h1>
      
      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center justify-center">
          <img src={aboutImage1} alt="About Us" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Welcome to MyHome2U</h2>
          <p className="text-lg text-gray-700 leading-8 text-justify">
            Welcome to MyHome2U, your ultimate destination for finding your perfect home. Whether you're looking to rent a cozy apartment or buy a luxurious house, we are committed to providing a seamless and personalized experience tailored to your unique needs and preferences. Our goal is to simplify the real estate process, making it easy and enjoyable for you to achieve your homeownership or rental dreams. At MyHome2U, we understand that finding a home is more than just a transaction; it's about finding a place where you can create memories, build your future, and feel truly at home. With our extensive listings, user-friendly interface, and expert support, we are here to guide you every step of the way. Trust us to be your partner in your real estate journey, and let us help you discover the perfect place to call your own.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-8 text-justify">
            Our mission is to simplify the process of renting and buying homes. We strive to offer a comprehensive platform where users can easily navigate through listings, find detailed property information, and make informed decisions. We believe that everyone deserves a place they can call home, and we are dedicated to making that journey as smooth and enjoyable as possible.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={aboutImage2} alt="Our Mission" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
      </div>
      
      {/* Section 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center justify-center">
          <img src={aboutImage3} alt="Our Story" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
          <p className="text-lg text-gray-700 leading-8 text-justify">
            MyHome2U was founded with the vision of revolutionizing the real estate market. Our team, comprised of industry veterans and tech enthusiasts, came together to create a platform that bridges the gap between technology and real estate. We understand the challenges and stresses that come with finding a new home, and we are committed to making it a hassle-free experience for you.
          </p>
        </div>
      </div>
      
      {/* Section 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Join Us Today</h2>
          <p className="text-lg text-gray-700 leading-8 text-justify">
            Start your journey with MyHome2U and discover a world of possibilities. Whether you're a first-time renter, a seasoned buyer, or somewhere in between, we have the resources and expertise to help you every step of the way. Thank you for choosing MyHome2U. We look forward to helping you find your perfect home.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={aboutImage4} alt="Join Us" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
