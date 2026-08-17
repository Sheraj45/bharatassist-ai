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

router.post("/", createScheme);

router.get("/", getSchemes);

router.get("/recommended", protect, getRecommendedSchemes);

router.get("/:id", getSchemeById);

router.put("/:id", updateScheme);

router.delete("/:id", deleteScheme);

module.exports = router;
