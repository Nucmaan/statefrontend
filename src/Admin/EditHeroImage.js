import React, { useEffect, useState, useCallback } from 'react';
import AdminSidebar from './AdminSidebar';
import api from "../api";
import { useNavigate, useParams } from 'react-router-dom';

const EditHeroImage = () => {
    const navigate = useNavigate(); 

    const [sectionImage, setSectionImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const fetchSection = useCallback(async () => {
        try {
            const response = await api.get(`/api/MyHome2U/HeroImage/SingleHeroImage/${id}`);
            const section = response.data.heroImage;
            setImagePreview(section.imageUrl.url);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        fetchSection();
    }, [fetchSection]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSectionImage(file);
            const previewUrl = URL.createObjectURL(file);  // Generate a preview URL for the selected image
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); 

        const formData = new FormData();
        formData.append("heroImage", sectionImage);
    
        try {
            const response = await api.put(`/api/MyHome2U/HeroImage/UpdateHeroImage/${id}`,formData);
    
            if (response.status === 200) {
                navigate("/admin/heroImage");
            } 
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); 
        }
    };
    
    return (
        <div className="flex min-h-screen bg-black">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-white">
                <div className="overflow-x-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Update HeroImage</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="sectionImage">Section Image</label>
                            <input
                                type="file"
                                id="sectionImage"
                                onChange={handleImageChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview of the selected sawir"
                                    className="mt-4 max-w-sm border border-gray-300 rounded-md"
                                />
                            )}
                        </div>

                        <div className='w-full'>
                            <button
                                type="submit"
                                className={`w-full px-4 py-2 rounded-md shadow-md transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    "Update Section"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditHeroImage;
