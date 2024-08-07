import React, { useState } from "react";
import herro from "../Images/Herro.jpg";
import h1 from "../Images/house.jpg";
import h2 from "../Images/house1.jpg";
import h3 from "../Images/house2.jpg";

import { Link } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { PiToiletDuotone } from "react-icons/pi";

function ViewProperty() {
  const [Book, setBook] = useState(false);

  const BookNow = () => {
    setBook(true);
  };

  const closebook = () => {
    setBook(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
        <div className="">
          <img src={herro} alt="Herro" className="w-full h-full object-cover" />
        </div>
        <div className="">
          <img src={h1} alt="House 1" className="w-full h-full object-cover" />
        </div>
        <div className="">
          <img src={h2} alt="House 2" className="w-full h-full object-cover" />
        </div>
        <div className="">
          <img src={h3} alt="House 3" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-2 px-4 ">
        <div className="">
          <div className="flex justify-between">
            <div className="flex font-bold py-3">
              <p className="my-1 border-r-2 border-black pr-2 ">Location</p>
              <p className="my-1 border-r-2 border-black px-2">Mogadisho</p>
              <p className="my-1 border-r-2 border-black px-2">Hodan</p>
              <p className="my-1  px-2">Vue Residences Titiwangsa</p>
            </div>
            <div className="pt-2">
              <button
                className="bg-black text-white px-5 py-2"
                onClick={BookNow}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="">
            <h1 className="  px-1 font-bold pb-1">RM 950/month</h1>
          </div>

          <div className="">
            <h1 className="my-2  px-1 font-bold">Description</h1>
            <p className="px-1 leading-8 text-justify">
              This Is A Small Room In A Mixed Gender Unit, 3-Bedrooms Unit At
              Vue Residences, Titiwangsa. The Unit Has 3 Bedrooms, 1 Is Master
              Room, 1 Is Medium Room And 1 Is Small Room. Master Room Is
              Occupied With A Male Doctor. Medium Room And Small Room Are
              Vacant.
            </p>
          </div>

          <div className="">
            <h1 className="mt-2  px-1 font-bold ">Facilities</h1>
            <p className="px-1 leading-8 text-justify">
              Security 24 Hr,Swimming,Elevator,Gym
            </p>
          </div>

          <h1 className="mt-1  px-1 font-bold ">Location</h1>

          <div>
            <div className="mt-4 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509433!2d144.953735315316!3d-37.81627927975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775c2b0a8b9e0!2sGoogle!5e0!3m2!1sen!2sus!4v1610606531694!5m2!1sen!2sus"
                width="100%"
                height="390"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="p-2  border-2 border-black mt-2 rounded-md">
          <div className="p-5  bg-gray-50 text-black rounded-md">
            <p className="mb-2 font-bold">To Move In</p>
            <p className="mb-2">First Month Rental RM : 950</p>
            <p className="mb-2">Deposit RM : 950</p>
            <p className="mb-2 font-bold">Total RM : 1,900 </p>
          </div>
        </div>
      </div>
      <div className="mx-auto p-2 my-9 bg-gray-50 ">
        <h1 className=" font-bold text-2xl my-2 pl-2">
          Recommended Properties
        </h1>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
          <div className="shadow-md p-3 rounded-md bg-white">
            <img src={herro} alt="Herro" className="w-full object-cover " />
            <div className="flex justify-between mt-2 ">
              <div>
                <h1 className="font-bold text-2xl">$3,280</h1>
              </div>
              <div>
                <button className=" px-6 py-1 font-bold bg-black text-white">
                  Rent
                </button>
              </div>
            </div>

            <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
            <p className="mb-2 font-bold italic border-b-2 border-black pb-2">
              Deposite : $ 1200{" "}
            </p>
            <div className="flex justify-between mb-2 ">
              <div className="flex  items-center">
                <FaBed className="text-black-600" />{" "}
                <span className="p-2"> 1 Qol</span>
              </div>

              <div className="flex  items-center">
                <PiToiletDuotone className="text-black" />{" "}
                <span className="p-2"> 1 Musqul</span>
              </div>

              <div className="flex  items-center">
                <MdDirectionsCar className="text-black" />{" "}
                <span className="p-2"> 1 Parking</span>
              </div>

              <div className="flex items-center">
                <button className=" px-6 py-1 font-bold  border-2 border-black">
                  <Link to="/ViewSingleProperty">View details</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="shadow-md p-3 rounded-md bg-white">
            <img src={herro} alt="Herro" className="w-full object-cover " />
            <div className="flex justify-between mt-2 ">
              <div>
                <h1 className="font-bold text-2xl">$3,280</h1>
              </div>
              <div>
                <button className=" px-6 py-1 font-bold bg-black text-white">
                  Rent
                </button>
              </div>
            </div>

            <h1 className="font-bold mb-2 ">Degmada Hodan - Mogadisho </h1>
            <p className="mb-2 font-bold italic border-b-2 border-black pb-2">
              Deposite : $ 1200{" "}
            </p>
            <div className="flex justify-between mb-2 ">
              <div className="flex  items-center">
                <FaBed className="text-black-600" />{" "}
                <span className="p-2"> 1 Qol</span>
              </div>

              <div className="flex  items-center">
                <PiToiletDuotone className="text-black" />{" "}
                <span className="p-2"> 1 Musqul</span>
              </div>

              <div className="flex  items-center">
                <MdDirectionsCar className="text-black" />{" "}
                <span className="p-2"> 1 Parking</span>
              </div>

              <div className="flex items-center">
                <button className=" px-6 py-1 font-bold  border-2 border-black">
                  <Link to="/ViewSingleProperty">View details</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          Book
            ? "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-5"
            : "hidden"
        }
      >
        <div className="relative text-white bg-black p-4">
          <button
            className="text-white font-bold absolute top-0 right-0 pr-3 pl-3 pt-2 text-3xl"
            onClick={closebook}
          >
            X
          </button>
    
          <div className="max-w-lg mx-auto p-6 bg-black shadow-md rounded-lg ">
  <p className="text-xl font-semibold mb-4 border-b pb-2">Booking Details</p>

  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="font-medium">House Location :</span>
      <span>Hodan</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Price : </span>
      <span>RM 4500</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Deposit :</span>
      <span>RM 500</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Total Price :</span>
      <span>RM 5000</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Check-In :</span>
      <span>10th Feb 2021</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-medium">Visit-In :</span>
      <input type="date" id="visit-date" className="text-black p-1 border rounded-md"></input>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">House Type :</span>
      <span>Apartment</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Number of Rooms :</span>
      <span>3</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium">Amenities :</span>
      <span>WiFi, Air Conditioning, Pool</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-medium">Special Requests :</span>
      <textarea className="text-black p-1 border rounded-md ml-2 flex-1"></textarea>
    </div>
    <div className="flex justify-end">
      <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600">
        Confirm
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default ViewProperty;
