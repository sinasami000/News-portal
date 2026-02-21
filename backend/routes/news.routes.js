import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  allPublishedNews,
  createNews,
  deleteNews,
  singleNews,
  topNewses,
  updateNews,
} from "../controllers/news.controllers.js";

const router = express.Router();

// @route   GET /api/news
// @desc    Get all published news with pagination, category filter, search
// @access  Public
router.get("/", allPublishedNews);

// @route   GET /api/news/top
// @desc    Get top 6 latest news
// @access  Public
router.get("/top", topNewses);

// @route   GET /api/news/:id
// @desc    Get single news by ID
// @access  Public
router.get("/:id", singleNews);

// @route   POST /api/news
// @desc    Create news
// @access  Private
router.post("/", protect, createNews);

// @route   PUT /api/news/:id
// @desc    Update news (author only)
// @access  Private
router.put("/:id", protect, updateNews);

// @route   DELETE /api/news/:id
// @desc    Delete news (author only)
// @access  Private
router.delete("/:id", protect, deleteNews);

export default router;
