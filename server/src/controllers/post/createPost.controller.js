import prisma from "../../config/db.js";

const createPostController = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createPostController;
