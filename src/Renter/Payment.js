import React from "react";
import SideBar from "./SideBar";

function Payment() {
  return (
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr] min-h-screen text-white">

      <div className="bg-black">
        <SideBar />
      </div>

      <div className="p-4 md:p-5 bg-white">
        <h1 className="text-center text-xl md:text-2xl text-black font-bold mb-4">Here Is Your Payment Details</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-2 border">Ref No</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Rent</th>
                <th className="p-2 border">Utilities</th>
                <th className="p-2 border">Dues</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-black text-center bg-gray-100 odd:bg-gray-200">
                <td className="p-2 border">123456789</td>
                <td className="p-2 border">12/09/2020</td>
                <td className="p-2 border">450</td>
                <td className="p-2 border">100</td>
                <td className="p-2 border">200</td>
                <td className="p-2 border">5750</td>
                <td className="p-2 border">
                  <button className="text-white px-3 py-1 md:px-5 md:py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300">
                    Download Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Payment;
