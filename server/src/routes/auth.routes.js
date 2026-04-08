import express from "express";

const router = express.Router();

// GET Routes
router.get("/auth-health", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

export default router;
