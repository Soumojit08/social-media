import prisma from "../config/db.js";

export const syncUser = async (req, res) => {
  try {
    const { userId } = req.auth;
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
        },
      });
    }

    res.json({ user: user });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
};
