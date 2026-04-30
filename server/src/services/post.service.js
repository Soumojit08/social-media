export const postIdService = () => {
  const str = "POST";
  const postId =
    str +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

    return postId;
};
