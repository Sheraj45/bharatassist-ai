require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in server/.env",
      );
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters long");
    }

    await connectDB();

    const email = ADMIN_EMAIL.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("An administrator with this email already exists.");
      console.log("No changes were made to the existing account.");
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await Admin.create({
      name: ADMIN_NAME.trim(),
      email,
      password: hashedPassword,
      isActive: true,
    });

    console.log("Administrator account created successfully.");
    console.log(`Admin email: ${email}`);
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
};

createAdmin();
