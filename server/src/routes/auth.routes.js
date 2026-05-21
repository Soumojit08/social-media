import express from "express";
import { requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

// GET Routes
router.get("/auth-health", (req, res) => {
  res.status(200).json({ message: "Auth route is working" });
});

router.get("/verify-token", requireAuth(), (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    auth: getAuth(req),
    authorizationHeader: req.headers.authorization,
  });
});

export default router;
