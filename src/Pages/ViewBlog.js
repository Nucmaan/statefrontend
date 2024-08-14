import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../api"; // Adjust the path if necessary
import Swal from "sweetalert2";
import herro from "../Images/Herro.jpg";

function ViewBlog() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        Swal.fire({
          title: 'Loading...',
          text: 'Please wait while we fetch the post.',
          icon: 'info',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await api.get(`/api/MyHome2U/Blog/GetSinglePost/${id}`);
        console.log(response.data); // Log the response data for debugging
        setPost(response.data.post);
        Swal.close();
      } catch (error) {
        console.error(error); // Log the error for debugging
        Swal.fire({
          title: 'Error',
          text: 'Failed to load the post. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    getPost();
  }, [id]);

  return (
    <div className="mx-auto px-2 py-8 md:px-2 md:py-12 max-w-4xl bg-gray-100">
      <h1 className="text-center font-extrabold text-5xl mb-10 text-gray-800">
        {post.title || 'Read Our Latest Blog'}
      </h1>

      <div className="shadow-lg rounded-lg bg-white overflow-hidden mb-12">
        <img 
          src={post.image?.url || herro} 
          alt="Blog" 
          className="w-full h-80 object-cover" 
        />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {post.title || 'Title goes here'}
          </h2>
          <div className="flex items-center text-gray-600 mb-6">
            <FaCalendarAlt className="text-xl mr-2" />
            <p className="text-lg">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date goes here'}
            </p>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {post.shortInfo || 'Short info goes here'}
          </p>
          <p className="text-gray-800 text-lg leading-relaxed text-justify">
            {post.content || 'Content goes here'}
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          More Articles
        </h2>
        <div className="space-y-6">
          {[1, 2, 3].map((item, index) => (
            <Link to={`/ViewBlog/${item}`} key={index}>
              <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-lg transition-transform transform hover:scale-105">
                <img
                  src={herro}
                  alt="Blog Preview"
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    7 Cost-Effective Renovation Ideas to Boost Your Rental Income
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="text-lg mr-2" />
                    <p className="text-md">July 17, 2024</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Link to="/ViewAll">
          <button className="px-10 py-4 font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ViewBlog;
