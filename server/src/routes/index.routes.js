import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { postController } from "../controllers/index.post.controller.js";

const router = express.Router();

//Index Routes
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is healthy" });
});

//Post Routes
router.post("/create-post", protect, postController.CreatePost);
router.delete("/delete-post/:id", protect, postController.DeletePost);
router.patch("/update-post/:id", protect, postController.UpdatePost);

export default router;
