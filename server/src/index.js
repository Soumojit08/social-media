import express from "express";
import dotenv from "dotenv";
import figlet from "figlet";
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from "@clerk/express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Creating instance
const app = express();
dotenv.config();

//Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Routes
app.use("/api", indexRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/protected", requireAuth(), async (req, res) => {
  const userId = getAuth(req);
  const user = await clerkClient.users.getUser(userId);

  return res.json({
    user: user,
    message: "authenticated!",
  });
});

//Port
const PORT = process.env.PORT || 5000;

//Running the server
app.listen(PORT, async () => {
  const text = await figlet.text("Server is running");
  console.log(text);
});
