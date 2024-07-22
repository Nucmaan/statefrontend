import React from "react";

import { SiStreamrunners } from "react-icons/si";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { HiDocumentSearch } from "react-icons/hi";



function WhyUs() {
  return (
    <div className="p-10 bg-gray-50">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="flex flex-col justify-center items-center p-3 bg-white shadow-md rounded-md">
          <SiStreamrunners className="" size={90} />
          <h1 className=" mb-2  text-center text-2xl font-bold">Speed</h1>
          <p className="mb-2 leading-5 text-center leading-7 ">
            Rent your property 5x faster than traditional rental platforms,
            hassle-free!
          </p>
        </div>

        <div className="flex flex-col justify-center items-center p-3 bg-white shadow-md rounded-md">
        <HiDocumentSearch className="" size={90} />
        <h1 className=" mb-2 mt-2  text-center text-2xl font-bold">Transparent</h1>
        <p className="mb-2 leading-5 text-center leading-7 ">
        Enjoy zero hidden charges and surprises. Tenants and landlords deal direct.
        </p>
      </div>


      <div className="flex flex-col justify-center items-center p-3 bg-white shadow-md rounded-md">
      <AiFillSafetyCertificate className="" size={90} />
      <h1 className=" mb-2 mt-2  text-center text-2xl font-bold">Safe</h1>
      <p className="mb-2 leading-5 text-center leading-7 ">
      Get peace of mind with Allianz protection and a lawyer approved digital tenancy agreement signing service.
      </p>
    </div>




      </div>
    </div>
  );
}

export default WhyUs;
