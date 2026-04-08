import express from "express";

const router = express.Router();

// GET Routes
router.get("/user-health", (req, res) => {
  res.status(200).json({ message: "User route is working" });
});

export default router;
