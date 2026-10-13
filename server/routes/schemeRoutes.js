const express = require("express");

const router = express.Router();

const {
  createScheme,
  getSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
  getRecommendedSchemes,
} = require("../controllers/schemeController");

const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminMiddleware");

// Public: view schemes
router.get("/", getSchemes);

// Logged-in users: personalized recommendations
router.get("/recommended", protect, getRecommendedSchemes);

// Public: view a specific scheme
router.get("/:id", getSchemeById);

// Admin only: modify scheme data
router.post("/", protectAdmin, createScheme);
router.put("/:id", protectAdmin, updateScheme);
router.delete("/:id", protectAdmin, deleteScheme);

module.exports = router;
