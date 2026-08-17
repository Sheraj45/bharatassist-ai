const Update = require("../models/Update");

// CREATE UPDATE
const createUpdate = async (req, res) => {
  try {
    const update = await Update.create(req.body);

    res.status(201).json({
      message: "Update created successfully",
      update,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL UPDATES
const getUpdates = async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updates = await Update.find({
      category: {
        $in: [user.category, "general"],
      },
    }).sort({
      publishedDate: -1,
    });

    res.status(200).json({
      category: user.category,
      updates,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE UPDATE
const getUpdateById = async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);

    if (!update) {
      return res.status(404).json({
        message: "Update not found",
      });
    }

    res.status(200).json({
      update,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({
        message: "Update not found",
      });
    }

    res.status(200).json({
      message: "Update updated successfully",
      update,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);

    if (!update) {
      return res.status(404).json({
        message: "Update not found",
      });
    }

    res.status(200).json({
      message: "Update deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
};
