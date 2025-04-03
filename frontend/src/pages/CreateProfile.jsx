import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    
   
    Object.keys(formData.address).forEach(key => {
      if (formData.address[key]) {
        formDataToSend.append(`address[${key}]`, formData.address[key]);
      }
    });
    
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await api.post("/api/profiles", formDataToSend);
      setMessage({ text: "Profile created successfully!", type: "success" });
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error creating profile:", error);
      setMessage({ 
        text: error.response?.data?.message || "Error creating profile", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Profile</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <h3 className="block text-gray-700 text-sm font-bold mb-2">Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="street">
                Street
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street"
                type="text"
                name="street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="city">
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                name="city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleAddressChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="state">
                State/Province
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                name="state"
                placeholder="State/Province"
                value={formData.address.state}
                onChange={handleAddressChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="country">
                Country
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                type="text"
                name="country"
                placeholder="Country"
                value={formData.address.country}
                onChange={handleAddressChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.address.postalCode}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
            Profile Photo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="photo"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Profile"}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/admin")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;