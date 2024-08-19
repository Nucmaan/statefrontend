import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Herro() {
  const defaultImageUrl = "https://d1y9xwfspocdum.cloudfront.net/story1/2246/4d2c3609329fa253d7a4e9e56b106dee8870_1280x720.jpg";
  const [heroImage, setHeroImage] = useState(null);

  const getHeroImage = async () => {
    try {
      const response = await api.get("/api/MyHome2U/HeroImage/AllHeroImages");
      setHeroImage(response.data.heroImages[0] || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeroImage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-4 md:py-2 flex flex-col justify-between">
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

        <div className="flex justify-center">
          <div
            className="w-[700px] h-[500px] rounded-md shadow-lg overflow-hidden" // Fixed width and height
          >
            <img
              src={heroImage ? heroImage.imageUrl.url : defaultImageUrl}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Herro;
