const express = require("express");
const { 
  createProfile, 
  getProfiles, 
  getProfileById, 
  updateProfile, 
  deleteProfile ,getProfileLocation
} = require("../controllers/profileController");
const {authMiddleware ,authorizeAdmin}= require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


router.get("/",authMiddleware, getProfiles);
router.get("/:id",authMiddleware, getProfileById);
router.get("/:id/location",authMiddleware, getProfileLocation);


router.post("/", authMiddleware, authorizeAdmin, upload.single("photo"), createProfile);
router.put("/:id", authMiddleware, authorizeAdmin, upload.single("photo"), updateProfile);
router.delete("/:id", authMiddleware, authorizeAdmin, deleteProfile);

module.exports = router;
