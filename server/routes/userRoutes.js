const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

const {
  signupUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
