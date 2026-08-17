const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["student", "farmer", "job_seeker", "senior_citizen", "general"],
    },

    source: {
      type: String,
      required: true,
    },

    officialWebsite: {
      type: String,
      required: true,
    },

    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Update", updateSchema);
