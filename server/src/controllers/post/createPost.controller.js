import prisma from "../../config/db.js";
import { postIdService } from "../../services/post.service.js";

const createPostController = async (req, res) => {
  try {
    const { mediaUrl, caption, noOfFiles } = req.body;
    const userId = req.auth.userId;
    const postId = postIdService();

    let post = await prisma.post.create({
      data: {
        caption,
        authorId: userId,
        createdAt: new Date(),
        likes: 0,
        comments: 0,
        content: {
          postId: postId,
          url: mediaUrl,
          type: "image" || "video",
          order: noOfFiles,
        },
      },
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createPostController;
