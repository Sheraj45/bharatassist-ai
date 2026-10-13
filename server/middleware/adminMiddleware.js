const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Administrator authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "admin" || !decoded.id) {
      return res.status(403).json({
        message: "Administrator access denied",
      });
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || !admin.isActive) {
      return res.status(403).json({
        message: "Administrator account is inactive or unavailable",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired administrator token",
      });
    }

    console.error("Admin authentication error:", error);

    return res.status(500).json({
      message: "Administrator authentication failed",
    });
  }
};

module.exports = protectAdmin;
