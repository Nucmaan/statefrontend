import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import { useSnackbar } from "notistack";
import api from "../api";

function SocialLinks() {
  const [editDetails, setEditDetails] = useState({
    youtube: "",
    tiktok: "",
    instagram: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [getSocial, setSocial] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

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
      const response = await api.put("/api/MyHome2U/socialMedia/UpdateLinks", editDetails);

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

  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar className="bg-black" />

      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Social Media Links</h1>

        {getSocial ? (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Links</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-800">YouTube:</span>
                <a href={getSocial.youtube} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{getSocial.youtube}</a>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-800">TikTok:</span>
                <a href={getSocial.tiktok} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{getSocial.tiktok}</a>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Instagram:</span>
                <a href={getSocial.instagram} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{getSocial.instagram}</a>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Facebook:</span>
                <a href={getSocial.facebook} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{getSocial.facebook}</a>
              </li>
            </ul>

            <button
              className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
              onClick={() => setShowEditForm(!showEditForm)}
            >
              {showEditForm ? "Hide Edit Form" : "Edit Links"}
            </button>

            {showEditForm && (
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 mt-6">
                <form onSubmit={handleEditSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="edit-youtube" className="block text-lg font-medium text-gray-700">YouTube</label>
                    <input
                      type="text"
                      id="edit-youtube"
                      value={editDetails.youtube}
                      onChange={(e) => setEditDetails({ ...editDetails, youtube: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-tiktok" className="block text-lg font-medium text-gray-700">TikTok</label>
                    <input
                      type="text"
                      id="edit-tiktok"
                      value={editDetails.tiktok}
                      onChange={(e) => setEditDetails({ ...editDetails, tiktok: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-instagram" className="block text-lg font-medium text-gray-700">Instagram</label>
                    <input
                      type="text"
                      id="edit-instagram"
                      value={editDetails.instagram}
                      onChange={(e) => setEditDetails({ ...editDetails, instagram: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-facebook" className="block text-lg font-medium text-gray-700">Facebook</label>
                    <input
                      type="text"
                      id="edit-facebook"
                      value={editDetails.facebook}
                      onChange={(e) => setEditDetails({ ...editDetails, facebook: e.target.value })}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Links"}
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No social media links found.</p>
        )}
      </div>
    </div>
  );
}

export default SocialLinks;
