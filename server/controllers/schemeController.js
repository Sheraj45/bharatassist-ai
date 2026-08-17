const Scheme = require("../models/Scheme");

// CREATE
const createScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);

    res.status(201).json({
      message: "Scheme created successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// READ ALL
const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();

    res.status(200).json({
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// READ ONE
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
      });
    }

    res.status(200).json({
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
      });
    }

    res.status(200).json({
      message: "Scheme updated successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
      });
    }

    res.status(200).json({
      message: "Scheme deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRecommendedSchemes = async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const schemes = await Scheme.find({
      category: {
        $in: [user.category, "general"],
      },
    });

    res.status(200).json({
      category: user.category,
      schemes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createScheme,
  getSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme,
  getRecommendedSchemes,
};
