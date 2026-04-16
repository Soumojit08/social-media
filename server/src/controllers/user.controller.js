import { getAuth } from "@clerk/express";
import prisma from "../config/db.js";

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { email, fullName, hasImage, imageId } = req.body;

    // console.log("Syncing user with ID:", userId, "and email:", email);

    if (!userId || !email) {
      return res.status(400).json({ error: "Missing user data" });
    }

    let user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name: fullName || "Name Not Found",
          hasImage,
          imageUrl,
        },
      });
    }

    res.json({ user: user, message: "User synced successfully" });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
};

export default syncUser;
