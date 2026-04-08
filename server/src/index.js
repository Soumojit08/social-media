import express from "express";
import dotenv from "dotenv";
import figlet from "figlet";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Creating instance
const app = express();
dotenv.config();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Port
const PORT = process.env.PORT || 5000;

//Running the server
app.listen(PORT, async () => {
  const text = await figlet.text("Server is running");
  console.log(text);
});
