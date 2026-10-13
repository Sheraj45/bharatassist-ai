const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  importPIBNewsAdmin,
} = require("../controllers/adminController");
const { getAllUpdatesAdmin } = require("../controllers/updateController");

const protectAdmin = require("../middleware/adminMiddleware");

router.post("/login", loginAdmin);

router.get("/me", protectAdmin, (req, res) => {
  res.status(200).json({
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
    },
  });
});

router.post("/import-pib", protectAdmin, importPIBNewsAdmin);

// Admin-only government updates management
router.get("/updates", protectAdmin, getAllUpdatesAdmin);

module.exports = router;
