import prisma from "../config/db.js";

export const createPost = async (authorId, caption, mediaFiles) => {
  if (!caption && mediaFiles.length === 0) {
    throw new Error("Post must have a caption or media");
  }
  const post = await prisma.post.create({
    data: {
      caption,
      authorId,
      createdAt: new Date(),
      content: {
        create: mediaFiles,
      },
    },
    include: {
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return post;
};
