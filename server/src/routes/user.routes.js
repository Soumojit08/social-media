import express from "express";
import { syncUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET Routes
router.get("/user-health", (req, res) => {
  res.status(200).json({ message: "User route is working" });
});

// POST Routes
//sync user data from clerk to our database
router.post("/sync", protect, syncUser);

export default router;
