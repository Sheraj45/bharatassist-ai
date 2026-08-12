const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    name: {
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

    eligibility: {
      type: String,
      required: true,
    },

    benefits: {
      type: String,
      required: true,
    },

    applicationProcess: {
      type: String,
      required: true,
    },

    officialWebsite: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      default: "All India",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Scheme", schemeSchema);
