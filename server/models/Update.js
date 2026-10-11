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

    language: {
      type: String,
      required: true,
      enum: ["en", "hi", "te"],
      default: "en",
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

    originalUrl: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    sourceType: {
      type: String,
      enum: ["official", "news", "manual"],
      default: "manual",
    },

    externalId: {
      type: String,
      default: "",
      unique: true,
      sparse: true,
    },

    isLive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Update", updateSchema);
