const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

module.exports = router;
