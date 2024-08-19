import React, { useEffect, useState, useCallback } from 'react';
import AdminSidebar from './AdminSidebar';
import api from "../api";
import { Link, useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
    const [sections, setSection] = useState([]);

    const navigate = useNavigate(); 

    const getAllSections = useCallback(async () => {
        try {
            const response = await api.get('/api/MyHome2U/AboutUs/AllSections');
            setSection(response.data.sections);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getAllSections();
    }, [getAllSections]);

    const handleDelete = async (id) => {
    
        try {
            const response = await api.delete(`/api/MyHome2U/AboutUs/DeleteSection/${id}`);
            if (response.status === 200) {
                navigate("/admin/aboutuspage"); 
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-black">
            <AdminSidebar />
            <main className="flex-1 p-8 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Section List</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors">
                    <Link to={`/admin/aboutuspage/addsection`} >
                    Add New Section
                    </Link>    
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">sectionTitle</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">sectionContent</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {sections.map((section, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{section.sectionTitle}</td>
                                    <td className="py-2 px-4">{section.sectionContent}</td>
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-2">
                                        <Link to={`/admin/aboutuspage/editsection/${section._id}`}>
                                            <button className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-yellow-600 transition-colors">
                                                Edit
                                            </button>
                                         </Link>
                                            <button
                                                onClick={() => {
                                                    handleDelete(section._id);
                                                }}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

        </div>
    );
};

export default AboutUsPage;
