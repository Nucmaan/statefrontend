import React, { useEffect, useState, useCallback } from "react";
import AgentSidebar from "./AgentSidebar";
import { useSnackbar } from "notistack";
import api from "../api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AgentBlog() {
  const { enqueueSnackbar } = useSnackbar();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    shortInfo: "",
    content: "",
    author: "",
    roll: "",
    image: null,
  });

  const { user } = useSelector((state) => state.user);

  const getPosts = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      const filteredPosts = response.data.posts.filter(post => post.author === user._id);
      setAllPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleDeleteClick = async (post_id) => {
    try {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while we delete the post.",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await api.delete(`/api/MyHome2U/Blog/DeletePost/${post_id}`);
      Swal.close();
      if (response.status === 200) {
        enqueueSnackbar("Post deleted successfully", { variant: "success" });
        getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('shortInfo', newPost.shortInfo);
    formData.append('content', newPost.content);
    formData.append('author', user._id);
    formData.append('roll', user.role);
    if (newPost.image) {
      formData.append('image', newPost.image);
    }

    try {
      const response = await api.post("/api/MyHome2U/Blog/AddPost", formData);

      if (response.status === 200) {
        enqueueSnackbar("Post created successfully", { variant: "success" });
        getPosts();
        setNewPost({
          title: "",
          shortInfo: "",
          content: "",
          author: "",
          roll: "",
          image: null,
        });
        setShowModal(false);
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create post";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="flex  md:flex-row min-h-screen bg-black">
      <AgentSidebar />
      <div className="overflow-x-auto w-full p-4 md:p-8 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Manage Posts</h1>
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => setShowModal(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            ADD Post
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
            <thead>
              <tr>
                <th className="py-2 px-3 md:py-3 md:px-6 text-left font-medium text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-2 px-3 md:py-3 md:px-6 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-2 px-3 md:py-3 md:px-6 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-2 px-3 md:py-3 md:px-6 text-left font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post, index) => (
                <tr key={post._id}>
                  <td className="py-2 px-3 md:py-4 md:px-6 text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-2 px-3 md:py-4 md:px-6 text-gray-900">
                    {post.title}
                  </td>
                  <td className="py-2 px-3 md:py-4 md:px-6 text-gray-900">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-center items-center py-2 px-3 md:py-4 md:px-6 text-gray-900">
                    <Link to={`/agent/Blog/Edit-Blog/${post._id}`}>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mr-2"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post._id)}
                      className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-lg mx-2">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Add New Post</h2>
              <form onSubmit={handleAddPostSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  <label
                    htmlFor="shortInfo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Short Info
                  </label>
                  <input
                    type="text"
                    id="shortInfo"
                    name="shortInfo"
                    value={newPost.shortInfo}
                    onChange={handleInputChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  <label
                    htmlFor="content"
                    className="text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    accept="image/*"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Add Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgentBlog;
