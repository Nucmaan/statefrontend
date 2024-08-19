import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

const HeroImage = () => {
  const [heroImage, setHeroImage] = useState([]);
  const navigate = useNavigate();

  const getAllSections = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/HeroImage/AllHeroImages");
      setHeroImage(response.data.heroImages);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllSections();
  }, [getAllSections]);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(
        `/api/MyHome2U/HeroImage/DeleteHeroImage/${id}`
      );
      if (response.status === 200) {
        navigate("/admin/heroImage");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Hero Image Management
          </h1>
          <Link to="/admin/heroImage/addHeroImage">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Add New Hero Image
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold">ID</th>
                <th className="py-4 px-6 text-left font-semibold">Hero Image</th>
                <th className="py-4 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {heroImage.map((hero, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <img
                      src={hero.imageUrl.url}
                      alt="Hero"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-4">
                      <Link
                        to={`/admin/heroImage/EditHeroImage/${hero._id}`}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(hero._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {heroImage.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No Hero Images found. Please add some images.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HeroImage;
