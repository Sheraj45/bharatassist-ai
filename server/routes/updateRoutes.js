const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminMiddleware");

const {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
} = require("../controllers/updateController");

// Public users must be authenticated to view their personalized updates.
router.get("/", protect, getUpdates);

// Anyone can open an individual update.
router.get("/:id", getUpdateById);

// Only authenticated administrators can manage updates.
router.post("/", protectAdmin, createUpdate);
router.put("/:id", protectAdmin, updateUpdate);
router.delete("/:id", protectAdmin, deleteUpdate);

module.exports = router;
