import express from "express";
import protect from "../middkeware/authMiddleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/").post(protect, createBlog).get(getAllBlogs);
router.route("/:id").get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;