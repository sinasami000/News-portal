import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  currentLoggedInUser,
  login,
  register,
} from "../controllers/auth.controllers.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", login);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", protect, currentLoggedInUser);

export default router;
