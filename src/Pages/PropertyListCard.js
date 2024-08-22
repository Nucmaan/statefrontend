import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaBed, FaBath, FaCar, FaArrowRight } from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import api from "../api";

function PropertyListCard() {
    const [propertyList, setPropertyList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const getProperty = useCallback(async () => {
        try {
            const response = await api.get("/api/MyHome2U/property/getallproperty");
            setPropertyList(response.data.properties);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Server error";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    }, [enqueueSnackbar]);

    useEffect(() => {
        getProperty();
    }, [getProperty]);

    // Filter the propertyList to include only properties with status 'Available'
    const availableProperties = propertyList.filter(property => property.status === 'Available');

    // Slice the filtered properties to include only the first three
    const displayedProperties = availableProperties.slice(0, 3);

    return (
        <div className="relative mx-auto p-10">
            <h1 className="text-center text-3xl font-bold mb-2">Explore Our Properties</h1>
            <p className="text-center text-2xl mb-8">A collection of our top properties</p>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {displayedProperties.map((property) => (
                    <Link to={`/ViewSingleProperty/${property._id}`} key={property._id}>
                        <div className="relative flex flex-col shadow-lg rounded-lg bg-white overflow-hidden transition-transform transform hover:scale-105">
                            <img
                                src={property.image.url}
                                alt={property.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-opacity-75 text-white p-2 text-xs font-semibold bg-black rounded-br-lg">
                                {`for ${property.houseType}`}
                            </div>
                            <div className="absolute top-[189px] right-0 m-2 px-6 py-2 bg-black text-white font-semibold rounded-br-lg">
                                ${property.price}
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h2>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <FaMapMarkerAlt className="mr-2 text-indigo-600" />
                                    <p>{property.city}</p>
                                </div>
                                <div className="flex items-center text-gray-600 mb-3">
                                    <FaDollarSign className="mr-2 text-indigo-600" />
                                    <p>Deposit: ${property.deposit}</p>
                                </div>
                                <div className="flex items-center text-gray-600 mb-3 space-x-4">
                                    <div className="flex items-center">
                                        <FaBed className="mr-1 text-indigo-600" />
                                        <p>{property.bedrooms} Beds</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaBath className="mr-1 text-indigo-600" />
                                        <p>{property.bathrooms} Baths</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCar className="mr-1 text-indigo-600" />
                                        <p>{property.parking} Parking</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <Link to={`/ViewSingleProperty/${property._id}`}>
                                        <button className="px-4 py-2 font-semibold text-white bg-black border-2 border-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
                
           <Link to="/AllListings" className='flex justify-end px-10 '>
           <button className="mt-5 flex items-center  px-4 py-2 font-semibold text-white bg-black border-2 border-black rounded-md hover:bg-gray-800 transition-colors duration-300">
               <span className="mr-2 ">View All</span>
               <FaArrowRight  />
           </button>
       </Link>
        </div>
    );
}

export default PropertyListCard;
