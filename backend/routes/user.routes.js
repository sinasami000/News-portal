import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { changePassword, updateProfile, userProfile } from "../controllers/user.controllers.js";

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, updateProfile);

// @route   PUT /api/users/change-password
// @desc    Change password
// @access  Private
router.put("/change-password", protect, changePassword);

// @route   GET /api/users/:id
// @desc    Get public user profile
// @access  Public
router.get("/:id", userProfile);

export default router;
