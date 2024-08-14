import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import api from "../api"; // Adjust the path if necessary
import Swal from "sweetalert2";

function ViewAll() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    try {
      // Show a loading alert
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the properties.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      setAllPosts(response.data.posts || []); // Ensure allPosts is always an array
      Swal.close();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to load properties. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mx-auto py-5 px-10 min-h-screen">
      <h1 className="text-center font-bold text-3xl mb-5 text-gray-800">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post, index) => (
          <Link to={`/ViewBlog/${post._id}`} key={index}>
            <div className="flex flex-col shadow-lg rounded-md bg-white transition-transform transform hover:scale-105">
              <img src={post.image.url} alt="Herro" className="w-full h-48 object-cover rounded-t-md" />
              <div className="flex flex-col p-4 flex-grow">
                <h1 className="mb-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h1>
                <div className="flex items-center mb-2 text-gray-600">
                  <FaCalendarAlt className="mr-1" />
                  <p className="mr-4">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <FaUser className="mr-1" />
                  <p>{post.roll}</p>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">
                  {post.shortInfo}
                </p>
                <div className="flex items-center justify-between">
                <Link to={`/ViewBlog/${post._id}`}>
                  <button className="flex items-center px-4 py-2 font-bold border-2 border-black rounded-md hover:bg-gray-100 transition-colors duration-300">
                    <AiOutlineRead className="mr-2" />
                    Read More
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ViewAll;
