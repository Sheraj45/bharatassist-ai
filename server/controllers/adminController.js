const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, admin.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        type: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Unable to log in",
    });
  }
};

const { importPIBNews } = require("../services/updateImporter");

const importPIBNewsAdmin = async (req, res) => {
  try {
    const result = await importPIBNews();

    return res.status(200).json({
      success: true,
      message: "PIB news import completed successfully.",
      result,
    });
  } catch (error) {
    console.error("Admin-triggered PIB import failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to import PIB news. Please try again later.",
    });
  }
};

module.exports = {
  loginAdmin,
  importPIBNewsAdmin,
};
