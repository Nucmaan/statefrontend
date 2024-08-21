import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../api"; 
import { useSnackbar } from "notistack";

function ViewBlog() {
  const [post, setPost] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const getPost = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Blog/GetSinglePost/${id}`);
      setPost(response.data.post || null); // Set post to null if not found
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Server error";
      enqueueSnackbar(errorMessage, { variant: "error" });
      setPost(null); // Set post to null on error
    }
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">
          This post is not available now.
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto px-2 py-8 md:px-2 md:py-12 max-w-4xl bg-gray-100">
      <h1 className="text-center font-extrabold text-5xl mb-10 text-gray-800">
        {post.title || 'Read Our Latest Blog'}
      </h1>

      <div className="shadow-lg rounded-lg bg-white overflow-hidden mb-12">
        <img 
          src={post.image?.url} 
          alt="Blog" 
          className="w-full h-80 object-cover" 
        />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {post.title || ''}
          </h2>
          <div className="flex items-center text-gray-600 mb-6">
            <FaCalendarAlt className="text-xl mr-2 text-indigo-600" />
            <p className="text-lg text-indigo-600">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
            </p>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {post.shortInfo || 'Short info goes here'}
          </p>
          <p className="text-gray-800 text-lg leading-relaxed text-justify">
            {post.content}
          </p>
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
