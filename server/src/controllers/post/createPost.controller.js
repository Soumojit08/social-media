import { getAuth } from "@clerk/express";
import { createPost } from "../../services/post.service.js";

const createPostController = async (req, res) => {
  try {
    const caption = req.body.caption ?? "";
    const { userId: authorId } = getAuth(req);

    const files = req.files || (req.file ? [req.file] : []);
    const mediaFiles = files.map((file, index) => ({
      url: file.path, // Cloudinary URL
      type: file.mimetype.startsWith("video/") ? "VIDEO" : "IMAGE",
      order: index,
    }));

    const post = await createPost(authorId, caption, mediaFiles);

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createPostController;
