const mongoose = require("mongoose");
const Update = require("../models/Update");

const ALLOWED_CATEGORIES = [
  "student",
  "farmer",
  "job_seeker",
  "senior_citizen",
  "general",
];

const ALLOWED_LANGUAGES = ["en", "hi", "te"];

const ALLOWED_SOURCE_TYPES = ["official", "news", "manual"];

const EDITABLE_FIELDS = [
  "title",
  "description",
  "category",
  "language",
  "source",
  "officialWebsite",
  "publishedDate",
  "originalUrl",
  "imageUrl",
  "sourceType",
  "isLive",
];

// CREATE UPDATE — admin only
const createUpdate = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      language = "en",
      source,
      officialWebsite,
      publishedDate,
      originalUrl = "",
      imageUrl = "",
      sourceType = "manual",
      isLive = false,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !category ||
      !source?.trim() ||
      !officialWebsite?.trim()
    ) {
      return res.status(400).json({
        message:
          "Title, description, category, source, and official website are required.",
      });
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (!ALLOWED_LANGUAGES.includes(language)) {
      return res.status(400).json({ message: "Invalid language." });
    }

    if (!ALLOWED_SOURCE_TYPES.includes(sourceType)) {
      return res.status(400).json({ message: "Invalid source type." });
    }

    const update = await Update.create({
      title: title.trim(),
      description: description.trim(),
      category,
      language,
      source: source.trim(),
      officialWebsite: officialWebsite.trim(),
      publishedDate: publishedDate || Date.now(),
      originalUrl,
      imageUrl,
      sourceType,
      isLive: Boolean(isLive),
    });

    return res.status(201).json({
      message: "Update created successfully",
      update,
    });
  } catch (error) {
    console.error("Create update error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "An update with this external ID already exists.",
      });
    }

    return res.status(500).json({ message: "Failed to create update." });
  }
};

// GET ALL UPDATES — authenticated users, personalized by category
const getUpdates = async (req, res) => {
  try {
    const User = require("../models/User");
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const language = ALLOWED_LANGUAGES.includes(req.query.language)
      ? req.query.language
      : "en";

    const categoryFilter = {
      category: { $in: [user.category, "general"] },
    };

    // Only published updates are visible to public users.
    const visibilityFilter = { isLive: true };

    let updates = await Update.find({
      ...categoryFilter,
      ...visibilityFilter,
      language,
    }).sort({ publishedDate: -1 });

    if (updates.length === 0 && language !== "en") {
      updates = await Update.find({
        ...categoryFilter,
        ...visibilityFilter,
        language: "en",
      }).sort({ publishedDate: -1 });
    }

    return res.status(200).json({
      category: user.category,
      language,
      updates,
    });
  } catch (error) {
    console.error("Get updates error:", error);
    return res.status(500).json({ message: "Failed to fetch updates." });
  }
};

// GET SINGLE UPDATE
const getUpdateById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid update ID." });
    }

    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    // Drafts must not be publicly accessible.
    if (!update.isLive) {
      return res.status(404).json({ message: "Update not found" });
    }

    return res.status(200).json({ update });
  } catch (error) {
    console.error("Get update by ID error:", error);
    return res.status(500).json({ message: "Failed to fetch update." });
  }
};

// UPDATE — admin only
const updateUpdate = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid update ID." });
    }

    // Update only approved fields; never allow changing externalId.
    const changes = {};

    for (const field of EDITABLE_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        changes[field] = req.body[field];
      }
    }

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: "No valid fields provided." });
    }

    if (
      changes.category !== undefined &&
      !ALLOWED_CATEGORIES.includes(changes.category)
    ) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (
      changes.language !== undefined &&
      !ALLOWED_LANGUAGES.includes(changes.language)
    ) {
      return res.status(400).json({ message: "Invalid language." });
    }

    if (
      changes.sourceType !== undefined &&
      !ALLOWED_SOURCE_TYPES.includes(changes.sourceType)
    ) {
      return res.status(400).json({ message: "Invalid source type." });
    }

    const update = await Update.findByIdAndUpdate(req.params.id, changes, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    return res.status(200).json({
      message: "Update updated successfully",
      update,
    });
  } catch (error) {
    console.error("Update update error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to update announcement." });
  }
};

// DELETE — admin only
const deleteUpdate = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid update ID." });
    }

    const update = await Update.findByIdAndDelete(req.params.id);

    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }

    return res.status(200).json({
      message: "Update deleted successfully",
    });
  } catch (error) {
    console.error("Delete update error:", error);
    return res.status(500).json({ message: "Failed to delete update." });
  }
};

// GET ALL UPDATES FOR ADMIN — includes drafts and unpublished updates
const getAllUpdatesAdmin = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: updates.length,
      updates,
    });
  } catch (error) {
    console.error("Admin fetch updates error:", error);

    return res.status(500).json({
      message: "Failed to fetch updates.",
    });
  }
};

module.exports = {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
  getAllUpdatesAdmin,
};
