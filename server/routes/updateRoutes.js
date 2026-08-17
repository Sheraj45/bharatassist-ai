const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
} = require("../controllers/updateController");

router.post("/", createUpdate);

router.get("/", protect, getUpdates);

router.get("/:id", getUpdateById);

router.put("/:id", updateUpdate);

router.delete("/:id", deleteUpdate);

module.exports = router;
