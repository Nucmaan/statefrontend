import React from "react";
import SideBar from "./SideBar";

function Booking() {
  return (
    <div className="sm:grid grid-cols-1 md:grid-cols-[1fr_10fr] min-h-screen">
      <div className="bg-black text-white">
        <SideBar />
      </div>
      <div className="p-5 bg-gray-50 text-black">
        <p className="text-xl md:text-2xl font-semibold mb-5">
          Here you can view your past and upcoming bookings or cancel them.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-black text-white">
              <tr className="">
                <th className="py-2 px-4 text-left text-sm sm:text-base">House Address/Location</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">House Type</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">No. Rooms</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Price</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Deposit</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Check-in Date</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Visiting Date</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Status</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Contract</th>
                <th className="py-2 px-4 text-left text-sm sm:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 text-sm sm:text-base">Hodan</td>
                <td className="py-2 px-4 text-sm sm:text-base">Rent</td>
                <td className="py-2 px-4 text-sm sm:text-base">5</td>
                <td className="py-2 px-4 text-sm sm:text-base">$5000</td>
                <td className="py-2 px-4 text-sm sm:text-base">$1000</td>
                <td className="py-2 px-4 text-sm sm:text-base">12/7/2024</td>
                <td className="py-2 px-4 text-sm sm:text-base">12/8/2024</td>
                <td className="py-2 px-4 text-sm sm:text-base">Pending</td>
                <td className="py-2 px-4 text-sm sm:text-base">Not Signed</td>
                <td className="py-2 px-4 text-sm sm:text-base">
                  <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300">
                    Cancel
                  </button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Booking;
