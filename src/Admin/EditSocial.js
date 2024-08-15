import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import { useSnackbar } from "notistack";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditSocial() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const [newPost, setNewPost] = useState({
    title: "",
    shortInfo: "",
    content: "",
    image: null,
  });

  const [post, setPost] = useState({});

  const getSinglePost = useCallback(async () => {
    try {
      const response = await api.get(`/api/MyHome2U/Blog/GetSinglePost/${id}`);
      setPost(response.data.post);
      setNewPost({
        title: response.data.post.title,
        shortInfo: response.data.post.shortInfo,
        content: response.data.post.content,
        image: response.data.post.image,
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getSinglePost();
  }, [getSinglePost]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("shortInfo", newPost.shortInfo);
    formData.append("content", newPost.content);
    formData.append("author", user._id); // Directly use user._id
    formData.append("roll", user.role);
    if (newPost.image && typeof newPost.image !== "string") {
      formData.append("image", newPost.image);
    }

    try {
      const response = await api.put(`/api/MyHome2U/Blog/UpdatePost/${id}`, formData);

      if (response.status === 200) {
        enqueueSnackbar("Post updated successfully", { variant: "success" });
        navigate("/admin/social-Media-Links");
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update post";
      enqueueSnackbar(errorMessage, { variant: "error" });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Update Post</h1>
        <form onSubmit={handleUpdatePost} className="space-y-6">
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
            />
          </div>
          {post.image && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-4 text-center">
                <img
                  src={post.image.url}
                  alt="Current"
                  className="h-48 w-48 object-cover rounded-md mx-auto"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSocial;
