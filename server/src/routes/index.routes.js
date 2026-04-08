import express from "express";

const router = express.Router();

//Index Routes
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Backend is healthy" });
});

export default router;
