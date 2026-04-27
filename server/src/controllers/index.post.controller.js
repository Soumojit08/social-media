import createPostController from "./post/createPost.controller.js";
import deletePostController from "./post/deletePost.controller.js";
import updatePostController from "./post/updatePost.controller.js";

export const postController = {
  CreatePost: createPostController,
  DeletePost: deletePostController,
  UpdatePost: updatePostController,
};
