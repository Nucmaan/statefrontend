import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import { useSnackbar } from "notistack";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SocialLinks() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [allPosts, setAllPosts] = useState([]);
  const [editDetails, setEditDetails] = useState({
    youtube: "",
    tiktok: "",
    instagram: "",
    facebook: "",
  });

  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [getSocial, setSocial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [newPost, setNewPost] = useState({
    title: "",
    shortInfo: "",
    content: "",
    image: null,
  });

  const getSocialLinks = useCallback(async () => {
    try {
      const response = await api.get("/api/MyHome2U/socialMedia/AllLinks");
      setSocial(response.data.data);
      setEditDetails(response.data.data);
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || "Failed to get social media links";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getSocialLinks();
  }, [getSocialLinks]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(
        "/api/MyHome2U/socialMedia/UpdateLinks",
        editDetails
      );

      if (response.status === 200) {
        enqueueSnackbar("Links updated successfully", { variant: "success" });
        getSocialLinks();
        setShowEditForm(false);
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update links";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    try {
     

      const response = await api.get("/api/MyHome2U/Blog/AllPosts");
      setAllPosts(response.data.posts || []);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDeleteClick = async (post_id) => {
    try {
    
      const response = await api.delete(`/api/MyHome2U/Blog/DeletePost/${post_id}`);
    
      if (response.status === 200) {
        enqueueSnackbar("Post deleted successfully", { variant: "success" });
        navigate("/admin/social-Media-Links");
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
        setShowModal(false);
        setNewPost({
          title: "",
          shortInfo: "",
          content: "",
          image: null,
        });
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
      <AdminSidebar className="bg-black" />

      <div className="flex-1 p-8 bg-white">
        <div className="flex-1 bg-white mb-4 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Posts</h1>

          <div className="mb-6">
            <button
              onClick={() => setShowModal(true)}
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
                    Roll
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
                      {post.roll}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                    <Link to={`/admin/Social-Media-Links/${post._id}`}>
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

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Social Media Links
        </h1>

        {getSocial ? (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Social Media Links</h2>

            <ul className="space-y-2">
              <li>
                <strong>YouTube:</strong> {getSocial.youtube}
              </li>
              <li>
                <strong>TikTok:</strong> {getSocial.tiktok}
              </li>
              <li>
                <strong>Instagram:</strong> {getSocial.instagram}
              </li>
              <li>
                <strong>Facebook:</strong> {getSocial.facebook}
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={() => setShowEditForm(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Edit Links
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {showEditForm && (
          <form onSubmit={handleEditSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="youtube"
                  className="block text-sm font-medium text-gray-700"
                >
                  YouTube
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={editDetails.youtube}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, youtube: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="tiktok"
                  className="block text-sm font-medium text-gray-700"
                >
                  TikTok
                </label>
                <input
                  type="url"
                  id="tiktok"
                  name="tiktok"
                  value={editDetails.tiktok}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, tiktok: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={editDetails.instagram}
                  onChange={(e) =>
                    setEditDetails({
                      ...editDetails,
                      instagram: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={editDetails.facebook}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, facebook: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {loading ? "Saving..." : "Save Links"}
              </button>
              <button
                onClick={() => setShowEditForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ml-4"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
                    onChange={handleInputChange}
                    className="col-span-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    accept="image/*"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {loading ? "Saving..." : "Save Post"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Cancel
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

export default SocialLinks;
