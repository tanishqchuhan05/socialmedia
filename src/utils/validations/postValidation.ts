import * as yup from 'yup';

export const addPostSchema = yup.object({
  user_id: yup.string().required(),
  image: yup.string().required(),
  caption: yup.string().required(),
});

export const updatePostSchema = yup.object({
  post_id: yup.string().required(),
  updatedData: yup.object().required(),
});

export const deletePostSchema = yup.object({
  post_id: yup.string().required(),
});

export const getAllPostsSchema = yup.object({
  user_id: yup.string().required(),
});

export const getSinglePostSchema = yup.object({
  user_id: yup.string().required(),
  post_id: yup.string().required(),
});
