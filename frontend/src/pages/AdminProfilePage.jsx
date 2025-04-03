

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../component/Map";
import api from "../../services/api";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

const AdminProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const baseUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/profiles"); 
      console.log(res.data);
      setProfiles(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profiles", error);
      setError("Failed to load profiles");
      setLoading(false);
    }
  };

  const deleteProfile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }
    
    try {
      await api.delete(`/api/profiles/${id}`);
      setProfiles(profiles.filter(profile => profile._id !== id));
    } catch (error) {
      console.error("Error deleting profile", error);
      alert("Error deleting profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-red-50 p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-red-800">Error loading profiles</h3>
                <p className="mt-1 text-red-700">{error}</p>
                <button 
                  onClick={fetchProfiles} 
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProfiles = profiles.filter(profile => 
    profile.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Profile Management</h2>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  />
                </div>
                <Link 
                  to="/admin/create" 
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Profile
                </Link>
              </div>
            </div>
          </div>
          
          {filteredProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-4 text-xl font-medium text-gray-500">No profiles found</p>
              <p className="mt-1 text-gray-400">Try adjusting your search or add a new profile</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProfiles.map((profile) => (
                    <tr key={profile._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {profile.photo ? (
                              <img 
                                src={`${baseUrl}${profile.photo.startsWith('/') ? profile.photo : `/uploads/${profile.photo}`}`} 
                                alt={profile.name} 
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 font-medium">
                                  {profile.name?.charAt(0) || '?'}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                           
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {profile.description || 'No description provided'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {profile.address && Object.values(profile.address).some(val => val) ? (
                          <div className="h-20 w-32 bg-gray-100 rounded-md overflow-hidden">
                            <Map address={profile.address} />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No location</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link 
                            to={`/admin/view/${profile._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Profile"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <Link 
                            to={`/admin/edit/${profile._id}`} 
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit Profile"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button 
                            onClick={() => deleteProfile(profile._id)} 
                            className="text-red-600 hover:text-red-900"
                            title="Delete Profile"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredProfiles.length}</span> of <span className="font-medium">{profiles.length}</span> profiles
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;