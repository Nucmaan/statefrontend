import React, { useEffect, useState } from "react";
import api from "../api"; 

function AboutUs() {
  const [section, setSection] = useState([]);

  const getAllSections = async () => {
    try {
      const response = await api.get("/api/MyHome2U/AboutUs/AllSections");
      setSection(response.data.sections);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSections();
  }, []);

  return (
    <div className="mx-auto p-8 min-h-screen">

      {section.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          There is no About Us content 
        </p>
      ) : (
        section.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${
                !isEven ? "md:grid-flow-row-dense" : ""
              }`}
            >
              {isEven ? (
                <>
                  <div className="flex items-center justify-center">
                    <img
                      src={item.sectionImage.url}
                      alt="About Us"
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      {item.sectionTitle}
                    </h2>
                    <p className="text-lg text-gray-700 leading-8 text-justify">
                      {item.sectionContent}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      {item.sectionTitle}
                    </h2>
                    <p className="text-lg text-gray-700 leading-8 text-justify">
                      {item.sectionContent}
                    </p>
                  </div>
                  <div className="flex items-center justify-center order-1 md:order-2">
                    <img
                      src={item.sectionImage.url}
                      alt="About Us"
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default AboutUs;
