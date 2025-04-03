import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Map from "../component/Map";
import api from "../../services/api";
import { ArrowLeft, Mail, Phone, MapPin, Globe, Edit } from "lucide-react";

const DetailProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  const baseUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/profiles/${id}`);
        setProfile(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile details", error);
        setError(error.response?.data?.message || "Failed to load profile details");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
          <Link 
            to="/admin" 
            className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Profiles
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-gray-500">No profile data available</p>
        <Link 
          to="/admin" 
          className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Profiles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <Link 
          to="/admin" 
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
        
        <Link 
          to={`/admin/edit/${profile._id}`} 
          className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm"
        >
          <Edit className="mr-1 h-4 w-4" />
          Edit
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      
        <div className="flex items-center p-4 border-b">
          <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
            {profile.photo ? (
              <img 
                src={`${baseUrl}${profile.photo.startsWith('/') ? profile.photo : `/uploads/${profile.photo}`}`} 
                alt={profile.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-medium text-blue-500">
                  {profile.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-medium text-gray-800">{profile.name}</h1>
            {profile.title && (
              <p className="text-gray-500">{profile.title}</p>
            )}
          </div>
        </div>

     
        <div className="p-4">
        
          {profile.description && (
            <div className="mb-4">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">About</h2>
              <p className="text-gray-700">{profile.description}</p>
            </div>
          )}

        

         
          {profile.address && Object.values(profile.address).some(val => val) && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Location</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                  <div className="text-gray-700">
                    {profile.address.street && <div>{profile.address.street}</div>}
                    <div>
                      {profile.address.city && <span>{profile.address.city}</span>}
                      {profile.address.city && profile.address.state && <span>, </span>}
                      {profile.address.state && <span>{profile.address.state}</span>}
                      {(profile.address.city || profile.address.state) && profile.address.zip && <span> </span>}
                      {profile.address.zip && <span>{profile.address.zip}</span>}
                    </div>
                    {profile.address.country && <div>{profile.address.country}</div>}
                  </div>
                </div>
                <div className="sm:w-1/2 h-40 bg-gray-100 rounded">
                  <Map address={profile.address} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;