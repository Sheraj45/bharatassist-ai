require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const updateRoutes = require("./routes/updateRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to BharatAssist AI Backend",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
