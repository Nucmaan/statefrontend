import React, { useEffect, useState, useCallback } from "react";
import AgentSidebar from "./AgentSidebar"; // Note: Capitalized to follow the component naming convention
import { useSnackbar } from "notistack";
import api from "../api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AgentBlog() {
  const { enqueueSnackbar } = useSnackbar();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Added state for modal visibility
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
        setShowModal(false); // Close the modal after successful submission
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
    <div className="flex min-h-screen bg-black">
      <AgentSidebar className="bg-black" />

      <div className="flex-1 p-8 bg-white">
        <div className="flex-1 bg-white mb-4 p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Posts</h1>

          <div className="mb-6">
            <button
              onClick={() => setShowModal(true)} // Open modal on button click
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              ADD Post
            </button>
          </div>
          <div>
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allPosts.map((post, index) => (
                  <tr key={post._id}>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {post.title}
                    </td>
                
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      <Link to={`/agent/Blog/Edit-Blog/${post._id}`}>
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mr-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
                <form onSubmit={handleAddPostSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700 text-right"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label
                      htmlFor="shortInfo"
                      className="text-sm font-medium text-gray-700 text-right"
                    >
                      Short Info
                    </label>
                    <input
                      type="text"
                      id="shortInfo"
                      name="shortInfo"
                      value={newPost.shortInfo}
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                    <label
                      htmlFor="content"
                      className="text-sm font-medium text-gray-700 text-right"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newPost.content}
                      onChange={handleInputChange}
                      rows={4}
                      className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <label
                      htmlFor="image"
                      className="text-sm font-medium text-gray-700 text-right"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentBlog;
