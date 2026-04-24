import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { postController } from "../controllers/index.post.controller";

const router = express.Router();

//Index Routes
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is healthy" });
});

//Post Routes
router.post("/create-post", protect, postController.CreatePost);

export default router;
