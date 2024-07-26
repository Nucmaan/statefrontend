import React from 'react'
import SideBar from './SideBar'

function Bills() {
  return (
    
    <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_10fr]  text-white  min-h-screen ">

    <div className="bg-black">
      <SideBar />
    </div>

    <div className="px-2 bg-white">
    <div className="pt-2">
      <h1 className="text-red-700 text-2xl font-bold mb-2">
        Due Amount: <span className="text-black">RM: 00.00</span>
      </h1>
      <p className="text-lg text-black font-bold mb-2">
        Contract Signed: <span className="">13/09/2020</span>
      </p>
      <p className="text-lg text-black font-bold">
        Deposit Money: RM 5000 <span></span>
      </p>
    </div>
    <div className="mt-4">
      <table className="w-full border-collapse">
        <thead className="bg-black text-white">
          <tr>
          <th className="p-2 border">Ref No</th>
          <th className="p-2 border">Month</th>
            <th className="p-2 border">Rent</th>
            <th className="p-2 border">Utilities</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-black text-center bg-gray-100 odd:bg-gray-200 ">
          <td className="p-2 border">123</td>
          <td className="p-2 border">January</td>
            <td className="p-2 border">450</td>
            <td className="p-2 border">100</td>
            <td className="p-2 border">550</td>
            <td className="p-2 border">
              <button className="text-white px-5 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300">
                Pay Now
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  </div>

  )
}

export default Bills