import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Component
const CustomPrevArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow custom-prev`}
    onClick={onClick}
  >
    &#10094; {/* Left Arrow Unicode */}
  </div>
);

const CustomNextArrow = ({ className, onClick }) => (
  <div
    className={`${className} custom-arrow custom-next`}
    onClick={onClick}
  >
    &#10095; {/* Right Arrow Unicode */}
  </div>
);

function Herro() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Image URLs
  const images = [
    "https://images.pexels.com/photos/7534285/pexels-photo-7534285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/4247768/pexels-photo-4247768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6140198/pexels-photo-6140198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6140198/pexels-photo-6140198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <div className="pb-5 pt-4 px-5 bg-gray-50 md:pt-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-black font-bold text-3xl lg:text-6xl leading-tight">
            Find your next <span className="text-indigo-600">perfect</span>
            <br />
            place with ease
          </h1>
          <p className="my-4 text-gray-700 text-lg sm:text-2xl leading-relaxed">
            MyHome2U is the best place to find your next perfect place to live.
            We have a wide range of properties for you to choose from.
          </p>
          <div>
            <Link to="/Rent">
              <button className="bg-indigo-600 px-7 py-3 text-2xl text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300">
                Find Now
              </button>
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="w-full h-auto object-cover rounded-md shadow-lg overflow-hidden">
            <Slider {...settings}>
              {images.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`${index}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom Arrow Styles */
        .custom-arrow {
          font-size: 24px; /* Smaller size for the arrow */
          color: white; /* Arrow color */
          z-index: 1000; /* Ensure arrows are above other elements */
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-prev {
          left: 10px; /* Position from the left */
        }

        .custom-next {
          right: 10px; /* Position from the right */
        }
      `}</style>
    </div>
  );
}

export default Herro;
