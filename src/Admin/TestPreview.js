import React from "react";
import AdminSidebar from "./AdminSidebar";

const TestScroll = () => {
  return (
    <div className="flex">
    <AdminSidebar />
    <div className="overflow-x-auto w-full"
    >
      <table 
      className="min-w-[600px] w-full"
      >
        <thead style={{ backgroundColor: "blue", color: "white" }}>
          <tr>
            <th className="p-3 border border-black">ID</th>
            <th className="p-3 border border-black">Name</th>
            <th style={{ padding: "8px", border: "1px solid black" }}>Email</th>
            <th style={{ padding: "8px", border: "1px solid black" }}>City</th>
            <th style={{ padding: "8px", border: "1px solid black" }}>Country</th>
            <th style={{ padding: "8px", border: "1px solid black" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-black">1</td>
            <td className="p-3 border border-black">Long Name</td>
            <td className="p-3 border border-black">LongEmail@domain.com</td>
            <td className="p-3 border border-black">VeryLongCityName</td>
            <td className="p-3 border border-black">VeryLongCountryName</td>
            <td className="p-3 border border-black">Edit</td>
          </tr>
        
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TestScroll;
