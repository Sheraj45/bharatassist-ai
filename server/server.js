require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
app.use(cors());
connectDB();
const PORT = 5000;
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to BharatAssist AI Backend",
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
