import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    photo: null
  });
  const [preview, setPreview] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    if (id && id !== "undefined") {
      fetchProfile();
    } else {
      setLoading(false);
      setError("Invalid profile ID. Please go back and select a valid profile.");
    }
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/profiles/${id}`);
      setProfile(res.data);
      setPreview(res.data.photo ? `${baseUrl}/uploads/${res.data.photo}` : null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile", error);
      setError("Failed to load profile. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        [e.target.name]: e.target.value
      }
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setProfile({ ...profile, photo: selectedFile });
      setPreview(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || id === "undefined") {
      setError("Cannot update: Invalid profile ID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("description", profile.description);

      if (profile.address) {
        formData.append("address[street]", profile.address.street || "");
        formData.append("address[city]", profile.address.city || "");
        formData.append("address[state]", profile.address.state || "");
        formData.append("address[zipCode]", profile.address.zipCode || "");
        formData.append("address[country]", profile.address.country || "");
      }

      if (profile.photo && profile.photo instanceof File) {
        formData.append("photo", profile.photo);
      }

      const res = await api.put(`/api/profiles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      
      if (res.data.photo) {
        setProfile({ ...profile, photo: res.data.photo });
        setPreview(`${baseUrl}/uploads/${res.data.photo}`);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading profile data...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => navigate("/admin")} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Return to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Profile Photo</label>
          <div className="flex items-center space-x-4">
            {preview && (
              <img 
                src={preview} 
                alt="Profile preview" 
                className="w-24 h-24 object-cover rounded-full"
              />
            )}
            <input
              type="file"
              name="photo"
              onChange={handlePhotoChange}
              className="border p-2"
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={profile.description || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded h-24"
            placeholder="Description"
          />
        </div>

        <div className="border p-4 rounded mb-4">
          <h3 className="font-medium mb-2">Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["street", "city", "state", "zipCode", "country"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={profile.address?.[field] || ""}
                  onChange={handleAddressChange}
                  className="border p-2 w-full rounded"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/admin")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEdit;
