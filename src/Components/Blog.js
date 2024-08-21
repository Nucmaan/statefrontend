import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import api from "../api";

function Blog() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      setAllPosts(response.data.posts || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="mx-auto py-10 px-5 md:px-10 bg-gray-50">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-8 text-gray-900">
        Blog
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allPosts.slice(0, 3).map((post, index) => (
          <Link to={`/ViewBlog/${post._id}`} key={index}>
            <div className="shadow-lg rounded-lg bg-white overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-full">
              <img
                src={post.image?.url}
                alt="Blog Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h1 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h1>
                <div className="flex items-center mb-4 text-gray-600">
                  <FaCalendarAlt className="mr-2 text-indigo-600" />
                  <p className="mr-6">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <FaTag className="mr-2 text-indigo-600" />
                  <p>{post.roll}</p>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">{post.shortInfo}</p>
                <div className="flex items-center justify-between mt-auto">
                  <Link to={`/ViewBlog/${post._id}`}>
                    <button className="flex items-center px-4 py-2 font-semibold text-white bg-black border-2 border-black rounded-md hover:bg-gray-800 transition-colors duration-300">
                      <AiOutlineRead className="mr-2 " />
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/ViewAll">
          <button className="px-6 py-2 font-semibold bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
            Load More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
