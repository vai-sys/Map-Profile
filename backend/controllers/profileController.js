const Profile = require("../models/profile");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getGeolocation = async (address) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const query = `${address.street}, ${address.city}, ${address.state}, ${address.country}`;

  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: { q: query, key: apiKey },
    });

    const { results } = response.data;
 
    if (results.length === 0) {
      throw new Error("Invalid address or not found.");
    }

    return {
      lat: results[0].geometry.lat,
      lng: results[0].geometry.lng,
    };
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    throw new Error("Geolocation lookup failed.");
  }
};


const createProfile = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; 

    if (!photo) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    const coordinates = await getGeolocation(address);
    const profile = new Profile({ name, description, photo, address: { ...address, coordinates } });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, description, address } = req.body;
    let profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

   
    if (req.file) {
     
      if (profile.photo) {
        const oldImagePath = path.join(__dirname, "..", profile.photo);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      profile.photo = `/uploads/${req.file.filename}`;
    }

    if (address) {
      const coordinates = await getGeolocation(address);
      profile.address = { ...address, coordinates };
    }

    profile.name = name || profile.name;
    profile.description = description || profile.description;

    await profile.save();
    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

 
    if (profile.photo) {
      const imagePath = path.join(__dirname, "..", profile.photo);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await profile.deleteOne();
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProfileLocation = async (req, res) => {
    try {
     
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
   
      const { lat, lng } = profile.address.coordinates;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  
      res.json({ lat, lng, mapUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  getProfileLocation
};
